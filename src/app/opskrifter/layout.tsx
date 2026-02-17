import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strikkeopskrifter | Stitch of Care",
  description:
    "Køb håndtegnede strikkeopskrifter fra Stitch of Care. Sweaters, cardigans og tilbehør i et roligt, skandinavisk udtryk.",
};

export default function OpskrifterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
