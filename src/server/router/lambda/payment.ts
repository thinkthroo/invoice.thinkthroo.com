import { PaymentModel } from "@/database/models/payment";
import { insertPaymentSchema } from "@/database/schemas/invoice-system/payment"; // Adjust the import path if necessary
import { publicProcedure, router } from "@/lib/trpc";
import { z } from "zod";

const paymentProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  return opts.next({
    ctx: {
      paymentModel: new PaymentModel(ctx.userId),
    },
  });
});

export const paymentRouter = router({
  getPaymentsByInvoiceId: paymentProcedure
    .input(z.object({ invoiceId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.paymentModel.getByInvoiceId(input.invoiceId, {
        current: 0,
        pageSize: 10,
      });
    }),

  getPaymentById: paymentProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.paymentModel.getById(input.id);
    }),

  createPayment: paymentProcedure
    .input(insertPaymentSchema.omit({ created_at: true }))
    .mutation(async ({ ctx, input }) => {
      const newPayment = await ctx.paymentModel.create(input);
      return newPayment.id;
    }),

  updatePayment: paymentProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: insertPaymentSchema.partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.paymentModel.update(input.id, input.data);
    }),

  deletePayment: paymentProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.paymentModel.delete(input.id);
    }),
});
