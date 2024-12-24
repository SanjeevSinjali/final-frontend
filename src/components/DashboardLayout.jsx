import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from ".";
import { Card, CardContent } from "./ui/card";

const DashboardLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <SidebarTrigger />
      <AppSidebar />
      <div className="p-2 w-full">{children}</div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
