import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Dashboard",
  description: "Masuk ke akun dashboard Anda",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
        padding: "clamp(1rem, 4vw, 2rem)",
      }}
    >
      {children}
    </div>
  );
}
