const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ code: 405, status: "Method Not Allowed" });
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailTo = process.env.EMAIL_TO || emailUser;
  const emailService = process.env.EMAIL_SERVICE || "gmail";

  if (!emailUser || !emailPass) {
    return res.status(500).json({
      code: 500,
      status: "Message Failed",
      error: "Email service is not configured.",
    });
  }

  const transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const name = `${req.body.firstName || ""} ${req.body.lastName || ""}`.trim();
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;

  const mail = {
    from: `Portfolio Contact <${emailUser}>`,
    replyTo: email,
    to: emailTo,
    subject: "Contact Form Submission - Portfolio",
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Message:</strong> ${message}</p>`,
  };

  try {
    await transporter.sendMail(mail);
    res.json({ code: 200, status: "Message Sent" });
  } catch (error) {
    console.error("Error sending contact email:", error);
    res.status(500).json({ code: 500, status: "Message Failed" });
  }
};
