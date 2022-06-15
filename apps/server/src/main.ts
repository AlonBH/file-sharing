import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';

import { fileRouter } from './app/routes/files';

const app = express();
app.use(cors());
app.use(express.json());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

app.use('/api/files', fileRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
