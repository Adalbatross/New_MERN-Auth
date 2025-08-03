import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,           // smtp-relay.brevo.com
  port: 587, // 587
//   secure: false,                         // false because port 587 uses STARTTLS, not SSL
    auth: {
    user: process.env.SMTP_USER,         // "your Brevo SMTP user"
    pass: process.env.SMTP_PASS          // "your Brevo SMTP password"
    }
});

export default transporter;
