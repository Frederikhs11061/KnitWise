import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurv | Stitch of Care",
  description:
    "Din indkøbskurv hos Stitch of Care. Gennemse dine valgte opskrifter og gå til betaling.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
