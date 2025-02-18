import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
  createSubscription,
  deleteSubscriptionById,
  getSubscriptions,
  getUserSubscriptions,
  subscriptionById,
} from "../controller/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getSubscriptions);

subscriptionRouter.get("/:id", subscriptionById);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/", (req, res) => {
  res.send({ title: "Update subscription" });
});

subscriptionRouter.delete("/:id", authorize,deleteSubscriptionById);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "Cancel subscription" });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "Get upcoming renewals" });
});

export default subscriptionRouter;
