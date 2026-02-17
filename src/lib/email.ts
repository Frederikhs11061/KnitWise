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

function generateEmailTemplate(data: EmailData): string {
  const itemList = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e8e2d8;">
          <div style="font-size: 16px; color: #2d2d2d; font-weight: 500;">
            ${item.patternName}
          </div>
          <div style="font-size: 14px; color: #6b6b6b; margin-top: 4px;">
            Antal: ${item.quantity}
          </div>
        </td>
      </tr>
    `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tak for dit køb - Stitch of Care</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #faf9f7; line-height: 1.6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #faf9f7;">
    <tr>
      <td style="padding: 40px 20px;">
        <!-- Container -->
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f5e8e6 0%, #e8ebe6 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 28px; font-weight: 600; color: #2d2d2d; margin-bottom: 8px;">
                Stitch of Care
              </div>
              <div style="font-size: 16px; color: #6b6b6b;">
                Tak for dit køb!
              </div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Success Icon -->
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 64px; height: 64px; background-color: #e8ebe6; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 32px;">✓</span>
                </div>
              </div>

              <!-- Main Message -->
              <h1 style="font-size: 24px; color: #2d2d2d; margin: 0 0 16px 0; text-align: center; font-weight: 600;">
                Din betaling er gennemført
              </h1>
              
              <p style="font-size: 16px; color: #4a4a4a; margin: 0 0 30px 0; text-align: center; line-height: 1.6;">
                Tak for dit køb hos Stitch of Care! Dine opskrifter er sendt til denne email.
              </p>

              <!-- Order Details -->
              <div style="background-color: #faf9f7; border-radius: 6px; padding: 24px; margin-bottom: 30px;">
                <div style="font-size: 14px; color: #6b6b6b; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Ordrenummer
                </div>
                <div style="font-size: 20px; color: #2d2d2d; font-weight: 600; font-family: monospace;">
                  ${data.orderNumber}
                </div>
              </div>

              <!-- Items List -->
              <div style="margin-bottom: 30px;">
                <h2 style="font-size: 18px; color: #2d2d2d; margin: 0 0 16px 0; font-weight: 600;">
                  Dine opskrifter
                </h2>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  ${itemList}
                </table>
              </div>

              <!-- Info Box -->
              <div style="background-color: #f5e8e6; border-left: 4px solid #c49a94; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                <div style="font-size: 16px; color: #2d2d2d; font-weight: 600; margin-bottom: 8px;">
                  📎 Hvad sker der nu?
                </div>
                <ul style="margin: 0; padding-left: 20px; color: #4a4a4a; font-size: 14px; line-height: 1.8;">
                  <li>Du modtager en email med dine opskrifter som PDF-filer</li>
                  <li>Hvis du ikke modtager emailen inden for 24 timer, kontakt support</li>
                  <li>Du kan også finde dem i din <a href="https://stichofcare.vercel.app/profil" style="color: #b87d75; text-decoration: underline;">købshistorik</a></li>
                </ul>
              </div>

              <!-- CTA Buttons -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 0 8px 0 0;">
                    <a href="https://stichofcare.vercel.app/opskrifter" style="display: block; background-color: #c49a94; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 6px; text-align: center; font-weight: 500; font-size: 16px;">
                      Se flere opskrifter
                    </a>
                  </td>
                  <td style="padding: 0 0 0 8px;">
                    <a href="https://stichofcare.vercel.app/profil" style="display: block; background-color: #ffffff; color: #b87d75; text-decoration: none; padding: 14px 24px; border-radius: 6px; text-align: center; font-weight: 500; font-size: 16px; border: 2px solid #c49a94;">
                      Se købshistorik
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <div style="border-top: 1px solid #e8e2d8; padding-top: 30px; text-align: center;">
                <p style="font-size: 14px; color: #6b6b6b; margin: 0 0 8px 0;">
                  Med venlig hilsen,<br>
                  <strong style="color: #2d2d2d;">Stitch of Care</strong>
                </p>
                <p style="font-size: 12px; color: #6b6b6b; margin: 0;">
                  <a href="https://stichofcare.vercel.app" style="color: #b87d75; text-decoration: none;">stichofcare.vercel.app</a> | 
                  <a href="mailto:kontakt@stitchofcare.dk" style="color: #b87d75; text-decoration: none;">kontakt@stitchofcare.dk</a>
                </p>
              </div>

            </td>
          </tr>
        </table>

        <!-- Footer Note -->
        <table role="presentation" style="max-width: 600px; margin: 20px auto 0;">
          <tr>
            <td style="text-align: center; padding: 20px; font-size: 12px; color: #6b6b6b;">
              <p style="margin: 0;">
                Dette er en automatisk email. Svar ikke på denne email.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
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

  // Normalize email to lowercase - Resend is case-sensitive for test emails
  const normalizedEmail = data.email.toLowerCase().trim();
  console.log("sendPatternEmail called for", normalizedEmail, "order", data.orderNumber, "items:", data.items.length);

  try {
    // Dynamic import to avoid build errors if Resend is not installed
    const { Resend } = await import("resend");
    const resendClient = new Resend(process.env.RESEND_API_KEY);

    // Generate HTML email template
    const htmlContent = generateEmailTemplate(data);

    // Get all pattern slugs (including duplicates for quantity > 1)
    const patternSlugs: string[] = [];
    data.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        patternSlugs.push(item.patternSlug);
      }
    });

    const attachments: { filename: string; content: Buffer }[] = [];
    try {
      const { generatePatternPDFs } = await import("./pdf");
      const pdfs = await generatePatternPDFs(patternSlugs);
      for (const pdf of pdfs) {
        attachments.push({ filename: pdf.filename, content: pdf.buffer });
      }
      if (attachments.length === 0 && patternSlugs.length > 0) {
        console.error("No PDFs generated despite having pattern slugs:", patternSlugs);
      }
    } catch (pdfError: any) {
      console.error("PDF generation failed:", pdfError?.message);
      throw new Error(`Kunne ikke generere PDF til email: ${pdfError?.message || "ukendt fejl"}`);
    }

    const result = await resendClient.emails.send({
      from: "Stitch of Care <onboarding@resend.dev>", // Test domain - change to your domain when verified
      to: normalizedEmail, // Use normalized email (lowercase) for Resend compatibility
      subject: `Tak for dit køb - Ordre ${data.orderNumber} | Stitch of Care`,
      html: htmlContent,
      attachments: attachments,
    });

    // Check if Resend returned an error
    if (result.error) {
      console.error("❌ Resend returned error:", result.error);
      throw new Error(`Resend API error: ${JSON.stringify(result.error)}`);
    }
    
    if (!result.data || !result.data.id) {
      console.error("❌ Resend response missing data.id:", result);
      throw new Error(`Resend API returned invalid response: ${JSON.stringify(result)}`);
    }
    
    // Return result for verification
    return result;
  } catch (error: any) {
    console.error("Error sending email:", error);
    console.error("Error details:", {
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
      response: error?.response,
    });
    // Throw error så det bliver fanget i send-order-email endpointet
    throw new Error(`Failed to send email: ${error?.message || "Unknown error"}`);
  }
}
