"use client";

import { DownloadInvoiceButton } from "./DownloadInvoice/DownloadInvoiceButton";
import { InvoiceDetailsForm } from "./InvoiceDetails/InvoiceDetailsForm";
import { InvoiceTermsForm } from "./InvoiceTerms/InvoiceTermsForm";
import { PaymentDetailsForm } from "./PaymentDetails/PaymentDetailsForm";
import { CompanyDetailsForm } from "./CompanyDetails/CompanyDetailsForm";
import { YourDetailsForm } from "./YourDetails/YourDetailsForm";
import { useGetValue } from "@/hooks/invoice/use-get-value";
import { getInitialValue } from "@/lib/get-initial-value";

export const UserInputForm = () => {
  const step = useGetValue("step", getInitialValue("step", "1"));

  return (
    <div>
      <div className={step === "1" ? "block" : "hidden"}>
        <YourDetailsForm />
      </div>
      <div className={step === "2" ? "block" : "hidden"}>
        <CompanyDetailsForm />
      </div>
      <div className={step === "3" ? "block" : "hidden"}>
        <InvoiceDetailsForm />
      </div>
      <div className={step === "4" ? "block" : "hidden"}>
        <PaymentDetailsForm />
      </div>
      <div className={step === "5" ? "block" : "hidden"}>
        <InvoiceTermsForm />
      </div>
      {step === "6" && <DownloadInvoiceButton />}
    </div>
  );
};
