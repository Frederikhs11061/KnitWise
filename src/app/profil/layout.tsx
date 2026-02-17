import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Min profil | Stitch of Care",
  description: "Se din købshistorik, gemte opskrifter og profilindstillinger.",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
