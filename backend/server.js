import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend Running" });
});

app.post("/api/get-connection", async (req, res) => {
  try {
    const { name, mobile, sector, speed } = req.body;

    if (!name || !mobile || !sector || !speed) {
      return res.status(400).json({ message: "All fields required" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.COMPANY_EMAIL,
      subject: "New Request",
      html: `<p>Name: ${name}</p>
      <p>Mobile Number: ${mobile}</p>
      <p>Sector: ${sector}</p>
      <p>Preferred Speed: ${speed}</p>`
    });

    res.status(200).json({ message: "Success" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default app;
