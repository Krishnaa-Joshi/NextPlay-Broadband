import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.options("*", cors());

app.get("/", (req, res) => {
  res.json({ message: "NextPlay Backend Running" });
});

// Get Connection 
app.post("/api/get-connection", async (req, res) => {
  try {
    const { name, mobile, sector, speed } = req.body;

    console.log("New Connection Request:", req.body);

    if (!name || !mobile || !sector || !speed) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Next Play Broadband" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL,
      subject: "📡 New Fiber Connection Request",
      html: `
        <h2>New Connection Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Sector:</strong> ${sector}</p>
        <p><strong>Preferred Speed:</strong> ${speed}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Request submitted successfully",
    });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({
      message: "Failed to send email",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
