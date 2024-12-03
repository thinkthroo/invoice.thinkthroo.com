import { Invoices } from "@/types/invoice";
import { IInvoiceService } from "./type";
import { lambdaClient } from "@/lib/trpc/client";

class InvoiceService implements IInvoiceService {
  createInvoice(): Promise<string> {
    return lambdaClient.invoice.createInvoice.mutate({
      invoice_number: 'INV-01',
      status: 'draft'
    });
  }
  getInvoices(): Promise<Invoices> {
    return lambdaClient.invoice.getInvoices.query();
  }
}

export const invoiceService = new InvoiceService();
