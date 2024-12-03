import { View } from "@react-pdf/renderer";
import { YourDetailsPDF } from "./YourDetails/YourDetailsPdf";
import { InvoiceTermsPdf } from "./InvoiceTerms/InvoiceTermsPdf";
import { CompanyDetailsPdf } from "./CompanyDetails/CompanyDetailsPdf";
import { InvoiceDetailsPdf } from "./InvoiceDetails/InvoiceDetailsPdf";
import { PaymentDetailsPdf } from "./PaymentDetails/PaymentDetailsPdf";
import { pdfUtils } from "@/lib/pdf-styles";

export const PdfDetails = ({
  yourDetails,
  companyDetails,
  invoiceDetails,
  paymentDetails,
  invoiceTerms,
  countryImageUrl,
}: {
  yourDetails: YourDetails;
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceItemDetails;
  paymentDetails: PaymentDetails;
  invoiceTerms: InvoiceTerms;
  countryImageUrl: string;
}) => (
  <View>
    <InvoiceTermsPdf {...invoiceTerms} />
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        ...pdfUtils.borderTop,
        ...pdfUtils.borderBottom,
      }}
    >
      <YourDetailsPDF {...yourDetails} />
      <CompanyDetailsPdf {...companyDetails} />
    </View>
    <View>
      <View style={pdfUtils.borderBottom}>
        <InvoiceDetailsPdf {...invoiceDetails} />
      </View>
      <View>
        <PaymentDetailsPdf
          {...paymentDetails}
          countryImageUrl={countryImageUrl}
        />
      </View>
    </View>
  </View>
);
