import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";

const tempDir = path.join(__dirname, "..", "..", "..", "public", "temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const uploadMulterMiddleware = multer({ storage });
