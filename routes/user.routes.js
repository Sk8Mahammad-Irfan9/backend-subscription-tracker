import { Router } from "express";
import { getUser, getUsers } from "../controller/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id",authorize, getUser);

userRouter.post("/get", (req, res) => {
  res.send({ title: "Create new user" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ title: "Update user" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ title: "delete user" });
});

export default userRouter;
