import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function MainLayout({
  children,
  nav,
  header
}: Readonly<{
  children: React.ReactNode;
  nav: React.ReactNode;
  header: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
        {nav}
        <SidebarInset>
          {header}
          {children}
        </SidebarInset>
    </SidebarProvider>
  );
}
