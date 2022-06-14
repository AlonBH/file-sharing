import { Router } from 'express';
import * as multer from 'multer';
import { Request, Response, Express } from 'express';
import * as path from 'path';

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

fileRouter.get('/:id', (req: Request, res: Response) => {
  // fs.readFile('./uploads/PS 6.docx', 'utf8', (err, data ) => {
  //   console.error(err);
    res.sendFile(path.join(__dirname, '../../../uploads/224739-targil.pdf'));
  // })
})

export { fileRouter };
