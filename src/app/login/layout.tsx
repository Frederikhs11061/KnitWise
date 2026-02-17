import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log ind | Stitch of Care",
  description: "Log ind eller opret en konto hos Stitch of Care for at få adgang til alle funktioner.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
