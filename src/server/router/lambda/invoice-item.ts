import { InvoiceItemModel } from "@/database/models/invoice-item";
import { insertInvoiceItemSchema } from "@/database/schemas/invoice-system/invoice-item";
import { publicProcedure, router } from "@/lib/trpc";
import { z } from "zod";

const invoiceItemProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  return opts.next({
    ctx: {
      invoiceItemModel: new InvoiceItemModel(ctx.userId),
    },
  });
});

export const invoiceItemRouter = router({
  getItemsByInvoiceId: invoiceItemProcedure
    .input(z.object({ invoiceId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.invoiceItemModel.getByInvoiceId(input.invoiceId, {
        current: 0,
        pageSize: 10,
      });
    }),

  getItemById: invoiceItemProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.invoiceItemModel.getById(input.id);
    }),

  createItem: invoiceItemProcedure
    .input(insertInvoiceItemSchema.omit({ created_at: true }))
    .mutation(async ({ ctx, input }) => {
      const newItem = await ctx.invoiceItemModel.create(input);
      return newItem.id;
    }),

  updateItem: invoiceItemProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: insertInvoiceItemSchema.partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.invoiceItemModel.update(input.id, input.data);
    }),

  deleteItem: invoiceItemProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.invoiceItemModel.delete(input.id);
    }),
});
