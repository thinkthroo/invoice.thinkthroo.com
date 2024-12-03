import "@/styles/globals.css";
import { geistMono, geistSans } from "@/lib/fonts";
import GlobalProvider from "@/layout/GlobalProvider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}

export { generateMetadata } from './metadata'