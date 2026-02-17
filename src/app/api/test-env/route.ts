import { NextRequest, NextResponse } from "next/server";

/**
 * Test endpoint to check if environment variables are available
 * Only use this for debugging - remove in production
 */
export async function GET(request: NextRequest) {
  const stripeVars = Object.keys(process.env)
    .filter((k) => k.toUpperCase().includes("STRIPE"))
    .reduce((acc, key) => {
      acc[key] = process.env[key]
        ? `${process.env[key]?.substring(0, 10)}... (length: ${process.env[key]?.length})`
        : "undefined";
      return acc;
    }, {} as Record<string, string>);

  const resendVars = Object.keys(process.env)
    .filter((k) => k.toUpperCase().includes("RESEND"))
    .reduce((acc, key) => {
      acc[key] = process.env[key]
        ? `${process.env[key]?.substring(0, 10)}... (length: ${process.env[key]?.length})`
        : "undefined";
      return acc;
    }, {} as Record<string, string>);

  return NextResponse.json({
    message: "Environment variables check",
    stripeVars,
    resendVars,
    hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
    hasPublishableKey: !!process.env.STRIPE_PUBLISHABLE_KEY,
    hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    hasResendApiKey: !!process.env.RESEND_API_KEY,
    nodeEnv: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter((k) =>
      ["STRIPE", "RESEND"].some((prefix) => k.toUpperCase().includes(prefix))
    ),
  });
}
