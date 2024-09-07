const nodemailer = require("nodemailer");
const path = require("path");

export default async function handler(req, res) {
  if (req.method === 'POST') {
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
      connectionTimeout: 50000, 
      socketTimeout: 50000, 
    });

    let mailOptions = {
      from: "noreply@myPorfolio.com",
      to: `${req.body.email}`,
      subject: "Thank you for visiting my Portfolio",
      text: "Portfolio Contact Details",
      attachments: [
        {
          filename: "Thank you.jpg",
          path: path.join(__dirname, "../images/thankyou.jpg"),
          cid: "posterImage",
        },
      ],
      html: `
        <div style="background-color: #000000; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; font-family: Arial, sans-serif;">
          <h2 style="color: #ffffff; text-align: center;">
              <b>Thank you for visiting my portfolio!</b>
          </h2>
          <div style="text-align: center;">
              <img src="cid:posterImage" alt="Thank You Image" style="width: 100%; max-width: 500px; border-radius: 10px;" />
          </div>
        </div>`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Thank you email sent successfully", info });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending thank you email" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
