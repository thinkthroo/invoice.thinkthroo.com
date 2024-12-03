import { ClientModel } from "@/database/models/client";
import { insertClientSchema } from "@/database/schemas/invoice-system/client";
import { publicProcedure, router } from "@/lib/trpc";
import { z } from "zod";

const clientProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  return opts.next({
    ctx: {
      clientModel: new ClientModel(ctx.userId),
    },
  });
});

export const clientRouter = router({
  getAllClients: clientProcedure.query(async ({ ctx }) => {
    return ctx.clientModel.getAll({ current: 0, pageSize: 10 });
  }),

  getClientById: clientProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.clientModel.getById(input.id);
    }),

  createClient: clientProcedure
    .input(insertClientSchema.omit({ created_at: true }))
    .mutation(async ({ ctx, input }) => {
      const newClient = await ctx.clientModel.create(input);
      return newClient.id;
    }),

  updateClient: clientProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: insertClientSchema.partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.clientModel.update(input.id, input.data);
    }),

  deleteClient: clientProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.clientModel.delete(input.id);
    }),
});
