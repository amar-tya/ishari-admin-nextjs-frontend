"use client";

import { useLoginViewModel } from "@/presentation/view-models";
import { LoginForm } from "@/presentation/components";

export default function LoginPage() {
  const viewModel = useLoginViewModel();

  return <LoginForm viewModel={viewModel} />;
}
