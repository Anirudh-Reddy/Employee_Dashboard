// fileUpload.model.js
import mongoose from "mongoose";

const fileUploadSchema = new mongoose.Schema({
    id: { type: String, required: true },
    files:{
      Visa:{ type: Array},
      Transcripts:{ type: Array},
      IDs:{ type: Array},
      Payslips:{ type: Array},
    },
    createdAt: { type: Date, default: Date.now },
});

const fileUploadModel = mongoose.model('fileupload', fileUploadSchema);

export default fileUploadModel;
