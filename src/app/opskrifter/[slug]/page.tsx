import type { Metadata } from "next";
import { Suspense } from "react";
import { getPatternBySlug } from "@/lib/patterns";
import PatternPageContent from "./PatternPageContent";

type Params = { slug: string };

export function generateMetadata({ params }: { params: Params }): Metadata {
  const slug = params?.slug ? decodeURIComponent(String(params.slug)) : "";
  const pattern = getPatternBySlug(slug);
  if (!pattern) {
    return {
      title: "Opskrift ikke fundet | Stitch of Care",
    };
  }
  return {
    title: `${pattern.name} | Stitch of Care`,
    description: pattern.intro,
  };
}

function PatternLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-32 bg-beige-200 rounded" />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="h-96 bg-beige-100 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-4 w-24 bg-beige-200 rounded" />
            <div className="h-8 w-3/4 bg-beige-200 rounded" />
            <div className="h-20 bg-beige-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PatternPage() {
  return (
    <Suspense fallback={<PatternLoading />}>
      <PatternPageContent />
    </Suspense>
  );
}
