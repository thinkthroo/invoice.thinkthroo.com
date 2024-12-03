import { subscribeWithSelector } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { StateCreator } from "zustand/vanilla";

import { isDev } from "@/utils/env";

import { createDevtools } from "../middleware/createDevTools";
import { InvoiceStoreState, initialState } from "./initialState";
import { InvoiceAction, createInvoiceSlice } from "./slices/invoice/action";

export interface InvoiceStore extends InvoiceAction, InvoiceStoreState {}

const createStore: StateCreator<InvoiceStore, [["zustand/devtools", never]]> = (
  ...parameters
) => ({
  ...initialState,
  ...createInvoiceSlice(...parameters),
});

const devtools = createDevtools("invoice");

export const useInvoiceStore = createWithEqualityFn<InvoiceStore>()(
  subscribeWithSelector(
    devtools(createStore, {
      name: "ThinkThroo_Invoice" + (isDev ? "_DEV" : ""),
    })
  ),
  shallow
);
