"use client";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

export default function ClientLayoutWrapper({ children }) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
