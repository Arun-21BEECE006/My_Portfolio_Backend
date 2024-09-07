const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
require('dotenv').config();


const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.post("/sendEmail", async (req, res) => {
  const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com'",
    service: "Gmail",
    port: 465,
    secure: false,
    auth: {
      user: "masterarun182@gmail.com",
      pass: "azfj pozb nwpk uoae",
    },
    tls: {
      rejectUnauthorized: false
  },
  connectionTimeout: 50000, // 10 seconds
  socketTimeout: 50000, // 10 seconds
  });

  let mailOptions = {
    from: "teamPortfolio@gmail.com",
    to: "masterarun182@gmail.com;ananth16.7.2001@gmail.com",
    subject: "Contacted you via Portfolio",
    // html: `<h1>Hii Arun Kumar</h1>`
    text: "Portfolio Contact Details",
    attachments: [
      {
        filename: "Thank you",
        path: path.join(__dirname, "images", "image.jpg"),
        cid: "posterImage",
      },
    ],
    html: `<div style="background-color: #000000; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; font-family: Arial, sans-serif; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
    <h1 style="color: #4CAF50; text-align: center; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; margin-bottom: 20px; font-size: 24px;">
        <b>Contact Details</b>
    </h1>
    <p style="color: #ffffff; line-height: 1.8; font-size: 16px; margin-bottom: 10px;">
        <b>Name:</b> ${req.body.name}
    </p>
    <p style="color: #ffffff; line-height: 1.8; font-size: 16px; margin-bottom: 10px;">
        <b>Email:</b> ${req.body.email}
    </p>
    <p style="color: #ffffff; line-height: 1.8; font-size: 16px; margin-bottom: 10px;">
        <b>Subject:</b> ${req.body.subject}
    </p>
    <p style="color: #ffffff; line-height: 1.8; font-size: 16px; margin-bottom: 10px;">
        <b>Message:</b> ${req.body.message}
    </p>
    <div style="text-align: center; margin-top: 20px;">
        <img src="cid:posterImage" alt="Thank You Image" style="width: 100%; max-width: 500px; height: auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);" />
    </div>
</div>

`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    res.status(200).send("Email sent successfully");
    console.log("result", info);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

app.post("/thankyouMail", async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
      user: "masterarun182@gmail.com",
      pass: "azfj pozb nwpk uoae",
    },
    tls: {
      rejectUnauthorized: false
  },
  connectionTimeout: 50000, // 10 seconds
  socketTimeout: 50000, // 10 seconds
  });

  let mailOptions = {
    from: "noreply@myPorfolio.com",
    to: `${req.body.email}`,
    subject: "Thank you for visiting my Portfolio",
    text: "Portfolio Contact Details",
    attachments: [
      {
        filename: "Thank you.jpg",
        path: path.join(__dirname, "images", "thankyou.jpg"),
        cid: "posterImage",
      },
    ],
    html: `
            <div style="background-color: #000000; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; font-family: Arial, sans-serif;">
    <h2 style="color: #ffffff; text-align: center;">
        <b>Thank you for visiting my portfolio and taking the time to send me a message!</b>
    </h2>
    <p style="color: #CECECE; text-align: center; line-height: 1.5; font-size: 16px;">
        Your interest in my work is truly appreciated, and I look forward to connecting with you.
    </p>
    <div style="text-align: center; margin-top: 20px;">
        <img src="cid:posterImage" alt="Thank You Image" style="width: 100%; max-width: 500px; height: auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);" />
    </div>
</div>

        `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    res.status(200).send("Email sent successfully");
    console.log("result", info);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`, process.env.PORT);
});
