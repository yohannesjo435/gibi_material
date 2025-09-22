"use client";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
