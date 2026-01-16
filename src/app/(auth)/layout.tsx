import type { Metadata } from "next";
import { DashboardLayout } from "@/presentation/components/layouts";

export const metadata: Metadata = {
  title: "Dashboard - ISHARI Admin",
  description: "ISHARI Admin Dashboard",
};

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
