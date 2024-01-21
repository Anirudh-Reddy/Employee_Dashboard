import express from "express";
import { handleFileUpload, retrieveFiles, updateFiles, removeFile } from "../controllers/file_upload.controller.js";
import upload from "../middlewares/file_upload.middleware.js";

const router = express.Router();

router.route('/').post(upload.array('files') ,handleFileUpload);
router.route("/retrieve/:id").get(retrieveFiles);
router.route("/update").post(upload.array('files') ,updateFiles);
router.route("/delete").delete(removeFile)

export default router;