'use client'

import { useInvoiceStore } from "@/store/invoice/store";
import InvoicesTable from "./features/InvoicesTable";
import { invoiceSelectors } from '@/store/invoice/selectors';

export default function InvoicesPage() {

    const [useFetchInvoices] = useInvoiceStore((s) => [s.useFetchInvoices]);

    useFetchInvoices();
    
    const invoices = useInvoiceStore(invoiceSelectors.invoices);
    

    return (
        <>
            <InvoicesTable 
                data={invoices ?? []}
            />
        </>
    )
}
