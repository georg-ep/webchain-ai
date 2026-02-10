
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextRequest, NextResponse } from "next/server";

const REGION = process.env.AWS_REGION || "us-east-1";
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const FROM_EMAIL = process.env.SES_FROM_EMAIL;
const TO_EMAIL = process.env.SES_TO_EMAIL || FROM_EMAIL;

if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !FROM_EMAIL) {
  console.error("Missing AWS SES environment variables. Please check .env.local");
}

const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID || "",
    secretAccessKey: SECRET_ACCESS_KEY || "",
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    console.log(`[API] Received inquiry from ${name} (${email})`);

    if (!FROM_EMAIL) {
        throw new Error("SES_FROM_EMAIL is not defined in environment variables");
    }

    const command = new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [TO_EMAIL || ""],
      },
      Message: {
        Subject: {
          Data: `New WebChain Inquiry: ${name}`,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            Charset: "UTF-8",
          },
          Html: {
            Data: `
              <h2>New Inquiry Received</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <br/>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br/>")}</p>
            `,
            Charset: "UTF-8",
          },
        },
      },
      ReplyToAddresses: [email],
    });

    await sesClient.send(command);
    console.log(`[API] Email sent successfully via SES`);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error("[API] SES Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
