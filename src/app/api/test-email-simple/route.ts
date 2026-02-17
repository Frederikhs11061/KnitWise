import { NextRequest, NextResponse } from "next/server";

/**
 * Test endpoint: Send SIMPEL email uden PDF - for at teste om problemet er PDF-generering.
 * POST /api/test-email-simple
 * Body: { email: "din@email.dk" }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Angiv email: { email: 'din@email.dk' }" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY ikke sat i Vercel" },
        { status: 500 }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log("Sending simple test email to:", email);

    const result = await resend.emails.send({
      from: "Stitch of Care <onboarding@resend.dev>",
      to: email,
      subject: "Test email - ingen PDF",
      html: `
        <h1>Test email</h1>
        <p>Dette er en simpel test email uden PDF.</p>
        <p>Hvis du modtager denne, virker Resend.</p>
      `,
    });

    console.log("Resend result:", result);

    return NextResponse.json({
      success: true,
      message: "Simpel email sendt",
      email,
      resendId: result.data?.id,
      error: result.error,
    });
  } catch (error: any) {
    console.error("Simple email error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Fejl",
        details: error?.response?.body || error?.stack,
      },
      { status: 500 }
    );
  }
}
