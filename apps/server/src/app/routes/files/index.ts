import { Router } from 'express';
import * as multer from 'multer';
import { Request, Response } from 'express';

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const filePrefix = Math.floor(100000 + Math.random() * 900000);
    cb(null, `${filePrefix}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const fileRouter = Router();

fileRouter.post('', upload.single('file'), (req: Request, res: Response) => {
  const code = parseInt((req as MulterRequest)?.file?.filename.slice(0, 6));
  res.send({ code });
});

export { fileRouter };
