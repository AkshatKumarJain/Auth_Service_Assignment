import express from "express";
import cors from "cors"
import { connectDB } from "./db/connection";
import authRoute from "./routes/Auth.route"
import userRoute from "./routes/user.route"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:8000", "*"],
  credentials: true
}));

connectDB();

app.use("/api/v1/Auth", authRoute);
app.use("/api/v1/users", userRoute);

app.get("/health", (_, res) => {
    res.send("api is running");
});

export default app;