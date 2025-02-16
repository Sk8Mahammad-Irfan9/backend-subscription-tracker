import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connecToDatabase from "./database/mongodb.js";
import errorMiddleWare from "./middleware/error.middleware.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

app.use(errorMiddleWare);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker Api!");
});

app.listen(PORT, async () => {
  console.log(`Subcription Tracker Api is running on http://localhost:${PORT}`);
  await connecToDatabase();
});

export default app;
