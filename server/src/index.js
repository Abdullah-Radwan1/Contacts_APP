import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import contactRoutes from "./routes/contactRoutes.js";
import Contact from "./models/contact.js";
import AppError from "../utils/appError.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const port = Number(process.env.PORT || 3000);
const mongoUri = process.env.MONGODB_URI;
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:4200")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

const sampleContacts = [
  {
    name: "Avery Johnson",
    email: "avery.johnson@example.com",
    phone: "+1 (555) 010-1201",
  },
  {
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
    phone: "+1 (555) 010-1202",
  },
  {
    name: "Morgan Chen",
    email: "morgan.chen@example.com",
    phone: "+1 (555) 010-1203",
  },
  {
    name: "Riley Patel",
    email: "riley.patel@example.com",
    phone: "+1 (555) 010-1204",
  },
  {
    name: "Taylor Brooks",
    email: "taylor.brooks@example.com",
    phone: "+1 (555) 010-1205",
  },
  {
    name: "Casey Nguyen",
    email: "casey.nguyen@example.com",
    phone: "+1 (555) 010-1206",
  },
];

app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "10kb" }));
app.use("/v1", apiLimiter, contactRoutes);
app.use("/v1", (request, response, next) => {
  next(new AppError("API route not found.", 404));
});
app.use(errorHandler);

async function start() {
  await mongoose.connect(mongoUri);
  console.log(`Connected to MongoDB database "${mongoose.connection.name}".`);

  if ((await Contact.countDocuments()) === 0) {
    await Contact.insertMany(sampleContacts);
  }

  app.listen(port, () => {
    console.log(`Contacts API listening on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start the contacts API:", error);
  process.exitCode = 1;
});
