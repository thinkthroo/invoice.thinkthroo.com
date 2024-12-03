export interface Invoice {
  status: "draft" | "sent" | "paid";
  id: string;
  created_at: Date | null;
  client_id: string | null;
  invoice_number: string;
  due_date: string | null;
  total_amount: string | null;
}

export type Invoices = Invoice[];
