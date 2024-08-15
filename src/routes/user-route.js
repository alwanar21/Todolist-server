import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import taskController from "../controller/task-controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

//User API
userRouter.get("/api/profile", userController.get);

//Task API
userRouter.get("/api/tasks", taskController.getAll);
userRouter.get("/api/task/:id", taskController.get);
userRouter.post("/api/task", taskController.create);
userRouter.patch("/api/task/:id", taskController.update);
userRouter.patch("/api/task/:id/status", taskController.updateStatus);
userRouter.delete("/api/task/:id", taskController.remove);

export { userRouter };
