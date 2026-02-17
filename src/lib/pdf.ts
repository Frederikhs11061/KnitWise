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

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
      });

      const buffers: Buffer[] = [];

      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);

      // Header
      doc
        .fontSize(24)
        .font("Helvetica-Bold")
        .fillColor("#2d2d2d")
        .text("Stitch of Care", 50, 50, { align: "center" });

      doc
        .fontSize(12)
        .font("Helvetica")
        .fillColor("#6b6b6b")
        .text("Strikkeopskrift", 50, 80, { align: "center" });

      // Pattern Name
      doc
        .fontSize(28)
        .font("Helvetica-Bold")
        .fillColor("#2d2d2d")
        .text(pattern.name, 50, 120, { align: "center" });

      // Pattern Info
      let yPos = 170;

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#6b6b6b")
        .text(`Sværhedsgrad: ${pattern.level}`, 50, yPos);
      yPos += 20;

      doc.text(`Kategori: ${pattern.category}`, 50, yPos);
      yPos += 30;

      // Intro
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#2d2d2d")
        .text("Introduktion", 50, yPos);
      yPos += 20;

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#4a4a4a")
        .text(pattern.intro, 50, yPos, {
          width: 495,
          align: "left",
        });
      yPos += doc.heightOfString(pattern.intro, { width: 495 }) + 20;

      // Construction
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#2d2d2d")
        .text("Konstruktion", 50, yPos);
      yPos += 20;

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#4a4a4a")
        .text(pattern.construction, 50, yPos, {
          width: 495,
          align: "left",
        });
      yPos += doc.heightOfString(pattern.construction, { width: 495 }) + 20;

      // Yarn
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#2d2d2d")
        .text("Garn", 50, yPos);
      yPos += 20;

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#4a4a4a")
        .text(pattern.yarn, 50, yPos, {
          width: 495,
          align: "left",
        });
      yPos += doc.heightOfString(pattern.yarn, { width: 495 }) + 20;

      // Includes
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#2d2d2d")
        .text("Det får du", 50, yPos);
      yPos += 20;

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#4a4a4a")
        .text(pattern.includes, 50, yPos, {
          width: 495,
          align: "left",
        });
      yPos += doc.heightOfString(pattern.includes, { width: 495 }) + 30;

      // Pattern Instructions (Prototype content)
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#2d2d2d")
        .text("Strikkeinstruktioner", 50, yPos);
      yPos += 20;

      const instructions = getPrototypeInstructions(pattern);
      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#4a4a4a")
        .text(instructions, 50, yPos, {
          width: 495,
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
          50,
          pageHeight - 30,
          { align: "center" }
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
