import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, type, budget, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("Contact form: SMTP_HOST, SMTP_USER or SMTP_PASS is not configured.");
    return res.status(500).json({ error: "Email isn't configured yet. Please try again later." });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL || "jashne.ali@apponward.com",
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${type || "Not specified"}`,
        `Budget: ${budget || "Not specified"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return res.status(500).json({ error: "Could not send your message. Please try again." });
  }
}
