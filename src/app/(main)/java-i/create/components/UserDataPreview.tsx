"use client";

import { PreviewDetails } from "./Form/PreviewDetails";
import { useData } from "@/hooks/invoice/use-data";
import { useFormContext } from "react-hook-form";

export const UserDataPreview = () => {
  const {
    companyDetails,
    invoiceDetails,
    invoiceTerms,
    paymentDetails,
    yourDetails,
  } = useData();
  const { setValue } = useFormContext();

  const onClick = (step: string) => {
    setValue("step", step);
    localStorage.setItem("step", step);
  };

  return (
    <PreviewDetails
      onClick={onClick}
      companyDetails={companyDetails}
      invoiceDetails={invoiceDetails}
      invoiceTerms={invoiceTerms}
      paymentDetails={paymentDetails}
      yourDetails={yourDetails}
    />
  );
};
