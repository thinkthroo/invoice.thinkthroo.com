import { InvoiceModel } from "@/database/models/invoice";
import { insertInvoiceSchema } from "@/database/schemas/invoice-system";
import { publicProcedure, router } from "@/lib/trpc";
import { z } from "zod";

const invoiceProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  return opts.next({
    ctx: {
      invoiceModel: new InvoiceModel(ctx.userId),
    },
  });
});

export const invoiceRouter = router({
  getInvoices: invoiceProcedure.query(async ({ ctx }) => {
    return ctx.invoiceModel.query({ current: 0, pageSize: 10 });
  }),

  getInvoiceById: invoiceProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.invoiceModel.getById(input.id);
    }),

  createInvoice: invoiceProcedure
    .input(insertInvoiceSchema.omit({ created_at: true }))
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.invoiceModel.create(input);
      return data.id;
    }),

  updateInvoice: invoiceProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: insertInvoiceSchema.partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.invoiceModel.update(input.id, input.data);
    }),

  deleteInvoice: invoiceProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.invoiceModel.delete(input.id);
    }),
});
