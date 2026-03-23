import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import authRoutes from "./routes/authRoutes";
import path from "path";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";

dotenv.config();

const app = express();

// Connect to database
 connectDB();

app.use(express.json());

// Serve UI files
app.use(express.static(path.join(__dirname, "../public")));

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

