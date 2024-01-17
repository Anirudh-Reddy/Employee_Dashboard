import express from "express";
import { createUser, getAllUsers, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.route('/create-user').post(createUser);
router.route('/').get(getAllUsers)
router.route("/update-user/:id").post(updateUser);
router.route("/delete-user/:id").delete(deleteUser);

export default router;