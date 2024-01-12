import multer from "multer";
import fs from 'fs';
import path from 'path';
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './files';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueIdentifier = crypto.randomBytes(8).toString('hex');
        let ext = path.extname(file.originalname);
        cb(null, `${Date.now()}_${uniqueIdentifier}${ext}`);
    }
});

const upload = multer({storage: storage});

export default upload;