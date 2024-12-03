/**
 * This file contains the root router of Lobe Chat tRPC-backend
 */
import { publicProcedure, router } from "@/lib/trpc";

import { invoiceRouter } from "./invoice";
import { clientRouter } from "./client";
import { invoiceItemRouter } from "./invoice-item";
import { paymentRouter } from "./payment";

export const lambdaRouter = router({
  healthcheck: publicProcedure.query(() => "i'm live!"),
  invoice: invoiceRouter,
  invoiceItem: invoiceItemRouter,
  client: clientRouter,
  payment: paymentRouter,
});

export type LambdaRouter = typeof lambdaRouter;
