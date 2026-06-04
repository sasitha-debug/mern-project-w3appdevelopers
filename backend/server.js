const express = require("express");
const cors = require("cors");
const dns = require("dns");
const mongoose = require("mongoose");
const ContactMessage = require("./models/contactMessage");
require("dotenv").config();

// Override the local resolver so mongodb+srv lookups can resolve through public DNS
// in environments where localhost DNS is broken.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => {
  const connectionError = [
    err.message,
    err?.cause?.message,
    err?.reason?.message,
    err?.reason?.reason,
  ].filter(Boolean).join(" ");

  console.error("MongoDB connection failed:", connectionError);

  if (connectionError.includes("whitelisted")) {
    console.error("Add this machine's public IP to Atlas Network Access whitelist.");
  }

  console.error(err);
});

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, subject, and message are required.",
      });
    }

    const savedMessage = await ContactMessage.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      subject: String(subject).trim(),
      message: String(message).trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Message saved successfully.",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save contact message.",
    });
  }
});

app.get("/api/contact", async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages.",
    });
  }
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});