const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

// server used to send send emails
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailTo = process.env.EMAIL_TO || emailUser;
const emailService = process.env.EMAIL_SERVICE || "gmail";

let contactEmail = null;

if (!emailUser || !emailPass) {
  console.warn(
    "Email credentials are not set. Please configure EMAIL_USER and EMAIL_PASS environment variables."
  );
} else {
  contactEmail = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  contactEmail.verify((error) => {
    if (error) {
      console.error("Email server connection failed:", error);
    } else {
      console.log("Mailer is ready to send messages");
    }
  });
}

router.post("/contact", (req, res) => {
  if (!contactEmail) {
    return res.status(500).json({
      code: 500,
      status: "Message Failed",
      error: "Email service is not configured.",
    });
  }

  const name = `${req.body.firstName || ""} ${req.body.lastName || ""}`.trim();
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: `Portfolio Contact <${emailUser}>`,
    replyTo: email,
    to: emailTo,
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.error("Error sending contact email:", error);
      res.status(500).json({ code: 500, status: "Message Failed" });
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});
