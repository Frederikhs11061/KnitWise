/**
 * Email utilities for sending pattern PDFs
 * Uses Resend for email delivery
 */

interface EmailData {
  email: string;
  orderNumber: string;
  items: Array<{
    patternSlug: string;
    patternName: string;
    quantity: number;
  }>;
}

export async function sendPatternEmail(data: EmailData) {
  // In production, use Resend or similar service
  // For now, we'll simulate it
  
  if (!process.env.RESEND_API_KEY) {
    console.log("Email service not configured. Would send email to:", data.email);
    console.log("Order:", data.orderNumber);
    console.log("Items:", data.items);
    return;
  }

  try {
    // Dynamic import to avoid build errors if Resend is not installed
    const { Resend } = await import("resend");
    const resendClient = new Resend(process.env.RESEND_API_KEY);

    // Build email content
    const itemList = data.items
      .map((item) => `- ${item.patternName} (${item.quantity}x)`)
      .join("\n");

    const emailContent = `
Hej!

Tak for dit køb hos Stitch of Care!

Din ordre: ${data.orderNumber}

Du har købt følgende opskrifter:
${itemList}

Dine opskrifter er vedhæftet som PDF-filer i denne email.

Held og lykke med strikningen!

Med venlig hilsen,
Stitch of Care
    `.trim();

    // Send email with PDF attachments
    // Note: In production, you would attach actual PDF files here
    await resendClient.emails.send({
      from: "Stitch of Care <noreply@stitchofcare.dk>",
      to: data.email,
      subject: `Din opskrift fra Stitch of Care - Ordre ${data.orderNumber}`,
      html: emailContent.replace(/\n/g, "<br>"),
      // attachments: [
      //   {
      //     filename: `${data.orderNumber}.pdf`,
      //     content: pdfBuffer,
      //   },
      // ],
    });

    console.log(`Email sent to ${data.email} for order ${data.orderNumber}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
