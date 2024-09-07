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
      from: "teamPortfolio@gmail.com",
      to: "masterarun182@gmail.com;ananth16.7.2001@gmail.com",
      subject: "Contacted you via Portfolio",
      text: "Portfolio Contact Details",
      attachments: [
        {
          filename: "Thank you",
          path: path.join(__dirname, "../images/image.jpg"),
          cid: "posterImage",
        },
      ],
      html: `
        <div style="background-color: #000000; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; font-family: Arial, sans-serif;">
          <h1 style="color: #4CAF50; text-align: center;">
              <b>Contact Details</b>
          </h1>
          <p style="color: #ffffff;">Name: ${req.body.name}</p>
          <p style="color: #ffffff;">Email: ${req.body.email}</p>
          <p style="color: #ffffff;">Subject: ${req.body.subject}</p>
          <p style="color: #ffffff;">Message: ${req.body.message}</p>
          <div style="text-align: center;">
              <img src="cid:posterImage" alt="Thank You Image" style="width: 100%; max-width: 500px; border-radius: 10px;" />
          </div>
        </div>`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully", info });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
