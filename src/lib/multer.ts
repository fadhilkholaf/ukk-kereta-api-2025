import multer from "multer";
import path from "path";

import { generateNanoId } from "./nanoid";

const storage = multer.diskStorage({
  destination: `${process.cwd()}/src/database/images`,
  filename: (req, file, cb) => {
    const filename = `${generateNanoId()}${path.extname(file.originalname)}`;
    req.body.filename = filename;
    cb(null, filename);
  },
});

export const upload = multer({ storage });
