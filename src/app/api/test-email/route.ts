import { NextRequest, NextResponse } from "next/server";

/**
 * Test endpoint: send a single email via Resend to verify setup.
 * GET /api/test-email?email=din@email.dk
 * Only works when RESEND_API_KEY is set. Remove or restrict in production.
 */
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      {
        error: "Angiv en gyldig email med ?email=din@email.dk",
        example: "https://stichofcare.vercel.app/api/test-email?email=din@email.dk",
      },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        error: "RESEND_API_KEY er ikke sat. Tjek Vercel → Settings → Environment Variables.",
        hasResendKey: false,
      },
      { status: 500 }
    );
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "Stitch of Care <onboarding@resend.dev>",
      to: email,
      subject: "Testmail fra Stitch of Care",
      html: `
        <p>Hej,</p>
        <p>Dette er en testmail fra Stitch of Care. Resend er sat korrekt op.</p>
        <p>Med venlig hilsen,<br>Stitch of Care</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Testmail sendt til " + email,
      resendId: result.data?.id,
      error: result.error,
    });
  } catch (err: any) {
    console.error("Test email error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Kunne ikke sende email",
        details: err?.response?.body || err?.stack,
      },
      { status: 500 }
    );
  }
}
