import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(userController.getAll).post(userController.createOne);

router
  .route("/:id")
  .get(userController.getOne)
  .patch(userController.updateOne)
  .delete(userController.removeOne);

export { router as userRoutes };
