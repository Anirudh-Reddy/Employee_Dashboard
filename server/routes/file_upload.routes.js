import express from "express";
import { handleFileUpload, retrieveFiles } from "../controllers/file_upload.controller.js";
import upload from "../middlewares/file_upload.middleware.js";

const router = express.Router();

router.route('/').post(upload.array('files') ,handleFileUpload);
router.route("/retrieve/:id").get(retrieveFiles);

export default router;