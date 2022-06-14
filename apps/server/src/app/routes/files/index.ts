import { Router } from 'express';
import * as multer from 'multer';
import { Request, Response, Express } from 'express';
import * as path from 'path';
import * as md5 from 'blueimp-md5';
import * as fs from 'fs';

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

const createIdFilePrefix = (file: Express.Multer.File) => parseInt(md5(file).slice(0, 6), 16) % 1000000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const filePrefix = createIdFilePrefix(file);
    cb(null, `${filePrefix}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const fileRouter = Router();

fileRouter.post('', upload.single('file'), (req: Request, res: Response) => {
  const code = parseInt((req as MulterRequest)?.file?.filename.slice(0, 6));
  res.send({ code });
});

fileRouter.get('/:id', (req: Request, res: Response) => {
  const files = fs.readdirSync('./uploads/');
  const selectedFile = files.filter(fileName => fileName.slice(0, 6) == req.params.id);

  if (selectedFile.length > 0) {
    res.sendFile(path.join(__dirname, '../../../uploads', selectedFile[0]));
  } else {
    res.sendStatus(404);
  }
})

export { fileRouter };
