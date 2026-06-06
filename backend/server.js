const express = require("express");
const cors = require("cors");
const dns = require("dns");
const mongoose = require("mongoose");
const ContactMessage = require("./models/contactMessage");
require("dotenv").config();

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

// ─── Models ───────────────────────────────────────────────────────────────────

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  status: { type: String, enum: ["active", "draft"], default: "active" },
}, { timestamps: true });

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, default: 5 },
}, { timestamps: true });

const contentSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  heroDescription: String,
  aboutTitle: String,
  aboutDescription: String,
  ctaTitle: String,
  ctaDescription: String,
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
const Testimonial = mongoose.model("Testimonial", testimonialSchema);
const Content = mongoose.model("Content", contentSchema);

// ─── Routes ───────────────────────────────────────────────────────────────────

app.get("/", (req, res) => res.send("Backend Running"));

// Contact
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    const saved = await ContactMessage.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      subject: String(subject).trim(),
      message: String(message).trim(),
    });
    return res.status(201).json({ success: true, message: "Message saved successfully.", data: saved });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return res.status(500).json({ success: false, message: "Failed to save contact message." });
  }
});

app.get("/api/contact", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch contact messages." });
  }
});

// Projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch projects." });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const { title, category, description, tags, status } = req.body;
    if (!title || !category || !description) {
      return res.status(400).json({ success: false, message: "Title, category, and description are required." });
    }
    const project = await Project.create({ title, category, description, tags: tags || [], status: status || "active" });
    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create project." });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ success: false, message: "Project not found." });
    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update project." });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found." });
    return res.status(200).json({ success: true, message: "Project deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete project." });
  }
});

// Testimonials
app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json(testimonials);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch testimonials." });
  }
});

app.post("/api/testimonials", async (req, res) => {
  try {
    const { name, role, content, rating } = req.body;
    if (!name || !role || !content) {
      return res.status(400).json({ success: false, message: "Name, role, and content are required." });
    }
    const testimonial = await Testimonial.create({ name, role, content, rating: rating || 5 });
    return res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create testimonial." });
  }
});

app.put("/api/testimonials/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testimonial) return res.status(404).json({ success: false, message: "Testimonial not found." });
    return res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update testimonial." });
  }
});

app.delete("/api/testimonials/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: "Testimonial not found." });
    return res.status(200).json({ success: true, message: "Testimonial deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete testimonial." });
  }
});

// Content
app.get("/api/content", async (req, res) => {
  try {
    const content = await Content.findOne().lean();
    return res.status(200).json(content || {});
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch content." });
  }
});

app.post("/api/content", async (req, res) => {
  try {
    const existing = await Content.findOne();
    if (existing) {
      const updated = await Content.findByIdAndUpdate(existing._id, req.body, { new: true });
      return res.status(200).json({ success: true, data: updated });
    } else {
      const content = await Content.create(req.body);
      return res.status(201).json({ success: true, data: content });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to save content." });
  }
});

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));