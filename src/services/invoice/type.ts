import { Invoices } from "@/types/invoice";

export interface IInvoiceService {
  getInvoices(): Promise<Invoices>;
}
