import { Invoice } from "@/types/invoice";

export interface InvoiceState {
  activeId: number | null;
  invoices: Invoice[];
}

export const initialInvoiceState: InvoiceState = {
  activeId: null,
  invoices: [],
};
