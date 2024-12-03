import {
  InvoiceState,
  initialInvoiceState,
} from "./slices/invoice/initialState";

export interface InvoiceStoreState extends InvoiceState {}

export const initialState: InvoiceState = {
  ...initialInvoiceState,
};
