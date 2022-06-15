import { Divider, Button, Typography, IconButton } from '@mui/material';
import { AttachFile, Upload, Download } from '@mui/icons-material';
import ReactCodeInput from 'react-code-input';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { saveAs } from 'file-saver';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './app.scss';
import { FileUpload } from './components/fileUpload';
import { CodeModal } from './components/codeModal';

export function App() {
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState('');
  const [downloadCode, setDownloadCode] = useState('');
  const [fileNotFound, setFileNotFound] = useState(false);

  const handleUploadedFile = (event: any) => {
    setSelectedFile(event.target.files[0]);
  }

  interface FileResponseBody {
    code: string
  }

  const handleFileSubmission = () => {
    const data = new FormData();
    if (selectedFile) {
      data.append('file', selectedFile);
      axios.post('http://localhost:3333/api/files', data).then((res: AxiosResponse<FileResponseBody>) => {
        setCode(res.data.code);
        setShowCode(true);
      });
    }
  }

  const handleFileDownload = () => {
    axios.get(`/files/${downloadCode}`, { responseType: 'blob' }).then((res: AxiosResponse) => {
      const file = new Blob([res.data], { type: res.headers['content-type'] });
      saveAs(file);
    }).catch(error => {
      setFileNotFound(true);
    });
  }

  const handleModalClose = () => {
    setShowCode(false);
  }

  return (
    <>
      <Typography variant="h3">Welcome to File Sharing</Typography>
      <div className="actions">
        <div className="action">
          <FileUpload label="Select File" uploadHandler={handleUploadedFile}>
            <AttachFile className="download" />
          </FileUpload>
          <IconButton color="primary" aria-label="upload picture" component="span" disabled={!selectedFile} onClick={handleFileSubmission}>
            <Upload />
          </IconButton>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className="action">
          <ReactCodeInput inputMode="numeric" name="fileCode" type="number" fields={6} onChange={setDownloadCode} />
          <Button variant="contained" onClick={handleFileDownload} endIcon={<Download />}>
            Download
          </Button>
        </div>
      </div>
      <CodeModal code={code} showModal={showCode} handleModalClose={handleModalClose} />
      <ErrorModal
        message={"File not found. Please verify code with sender and try again"}
        showModal={fileNotFound}
        handleModalClose={() => setFileNotFound(false)} />
    </>
  );
}

export default App;
