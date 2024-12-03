import { InvoiceStore } from '../../../store';
import { Invoices } from '@/types/invoice';

const invoices = (s: InvoiceStore): Invoices => s.invoices;

export const invoiceSelectors = {
    invoices
}