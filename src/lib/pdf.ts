/**
 * PDF generation utilities for knitting patterns
 * Generates PDF files for each pattern
 */

import PDFDocument from "pdfkit";
import { getPatternBySlug, type Pattern } from "./patterns";

/**
 * Generate a PDF buffer for a knitting pattern
 */
export async function generatePatternPDF(patternSlug: string): Promise<Buffer> {
  const pattern = getPatternBySlug(patternSlug);

  if (!pattern) {
    throw new Error(`Pattern not found: ${patternSlug}`);
  }

  const PAGE_WIDTH = 595;
  const MARGIN = 50;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
      });

      const buffers: Buffer[] = [];

      doc.on("data", (chunk: Buffer) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);

      // Header – width nødvendig for align: center i PDFKit
      doc
        .fontSize(24)
        .font("Helvetica-Bold")
        .fillColor("#2d2d2d")
        .text("Stitch of Care", MARGIN, 50, { width: CONTENT_WIDTH, align: "center" });

      doc
        .fontSize(12)
        .font("Helvetica")
        .fillColor("#6b6b6b")
        .text("Strikkeopskrift", MARGIN, 80, { width: CONTENT_WIDTH, align: "center" });

      // Pattern Name
      doc
        .fontSize(28)
        .font("Helvetica-Bold")
        .fillColor("#2d2d2d")
        .text(pattern.name, MARGIN, 120, { width: CONTENT_WIDTH, align: "center" });

      // Pattern Info
      let yPos = 170;

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#6b6b6b")
        .text(`Sværhedsgrad: ${pattern.level}`, MARGIN, yPos);
      yPos += 20;

      doc.text(`Kategori: ${pattern.category}`, MARGIN, yPos);
      yPos += 30;

      // Intro
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#2d2d2d")
        .text("Introduktion", MARGIN, yPos);
      yPos += 20;

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#4a4a4a")
        .text(pattern.intro, MARGIN, yPos, {
          width: CONTENT_WIDTH,
          align: "left",
        });
      yPos += doc.heightOfString(pattern.intro, { width: CONTENT_WIDTH }) + 20;

      // Construction
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#2d2d2d")
        .text("Konstruktion", MARGIN, yPos);
      yPos += 20;

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#4a4a4a")
        .text(pattern.construction, MARGIN, yPos, {
          width: CONTENT_WIDTH,
          align: "left",
        });
      yPos += doc.heightOfString(pattern.construction, { width: CONTENT_WIDTH }) + 20;

      // Yarn
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#2d2d2d")
        .text("Garn", MARGIN, yPos);
      yPos += 20;

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#4a4a4a")
        .text(pattern.yarn, MARGIN, yPos, {
          width: CONTENT_WIDTH,
          align: "left",
        });
      yPos += doc.heightOfString(pattern.yarn, { width: CONTENT_WIDTH }) + 20;

      // Includes
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#2d2d2d")
        .text("Det får du", MARGIN, yPos);
      yPos += 20;

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#4a4a4a")
        .text(pattern.includes, MARGIN, yPos, {
          width: CONTENT_WIDTH,
          align: "left",
        });
      yPos += doc.heightOfString(pattern.includes, { width: CONTENT_WIDTH }) + 30;

      // Pattern Instructions (Prototype content)
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#2d2d2d")
        .text("Strikkeinstruktioner", MARGIN, yPos);
      yPos += 20;

      const instructions = getPrototypeInstructions(pattern);
      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#4a4a4a")
        .text(instructions, MARGIN, yPos, {
          width: CONTENT_WIDTH,
          align: "left",
        });

      // Footer
      const pageHeight = doc.page.height;
      doc
        .fontSize(8)
        .font("Helvetica")
        .fillColor("#6b6b6b")
        .text(
          `© ${new Date().getFullYear()} Stitch of Care. Alle rettigheder forbeholdes.`,
          MARGIN,
          pageHeight - 30,
          { width: CONTENT_WIDTH, align: "center" }
        );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get prototype instructions for a pattern
 * In production, this would come from a database or detailed pattern file
 */
function getPrototypeInstructions(pattern: Pattern): string {
  const baseInstructions = `
Dette er en prototype-version af opskriften. Den fulde opskrift vil indeholde:

• Detaljerede maskeantal for alle størrelser
• Strikkefasthed og pindestørrelse
• Trin-for-trin vejledning
• Diagrammer til mønstre
• Tips og tricks til at få det perfekte resultat
• Størrelsesguide

For denne prototype, her er grundlæggende information:

${pattern.name} er en ${pattern.level.toLowerCase()} opskrift i kategorien ${pattern.category.toLowerCase()}.

${pattern.construction}

${pattern.yarn}

Brug vores strikkeberegnere på stichofcare.vercel.app til at:
• Beregne strikkefasthed
• Finde alternativt garn
• Justere maskeantal
• Estimere garnforbrug

Den fulde opskrift vil blive sendt til dig når den er klar.
`;

  return baseInstructions.trim();
}

/**
 * Generate PDFs for multiple patterns
 */
export async function generatePatternPDFs(
  patternSlugs: string[]
): Promise<Array<{ slug: string; buffer: Buffer; filename: string }>> {
  const pdfs = await Promise.all(
    patternSlugs.map(async (slug) => {
      const pattern = getPatternBySlug(slug);
      const buffer = await generatePatternPDF(slug);
      return {
        slug,
        buffer,
        filename: `${pattern?.name || slug}.pdf`.replace(/\s+/g, "-"),
      };
    })
  );

  return pdfs;
}
