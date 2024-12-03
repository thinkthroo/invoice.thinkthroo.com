import { Invoices } from "@/types/invoice";
import useSWR, { SWRResponse, mutate } from "swr";
import { StateCreator } from "zustand";
import { InvoiceStore } from "@/store/invoice/store";
import { useClientDataSWR } from "@/lib/swr";
import { invoiceService } from "@/services/invoice";
import { setNamespace } from "@/utils/storeDebug";

const FETCH_INVOICES_KEY = "fetchInvoices";

const n = setNamespace('invoice');

export interface InvoiceAction {
  useFetchInvoices: () => SWRResponse<Invoices>;
  createInvoice: () => Promise<string>;
}

export const createInvoiceSlice: StateCreator<
  InvoiceStore,
  [["zustand/devtools", never]],
  [],
  InvoiceAction
> = (set, get) => ({

  createInvoice: async () => {
    const id = await invoiceService.createInvoice();
    return id;
  },

  useFetchInvoices: () =>
    useClientDataSWR<Invoices>(
      [FETCH_INVOICES_KEY],
      () => invoiceService.getInvoices(),
      {
        fallbackData: [],
        onSuccess: (data) => {
          set(
            {
              invoices: data
            },
            false,
            n('invoices')
          )
        },
        suspense: true,
      }
    ),
});
