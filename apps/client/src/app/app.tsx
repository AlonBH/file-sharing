import { Divider, Button, Typography, IconButton, Modal, Box } from '@mui/material';
import { Upload, Download, Send } from '@mui/icons-material';
import ReactCodeInput from 'react-code-input';
import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { FileUpload } from './components/fileUpload';

export function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCode, setShowCode] = useState(false);

  const handleUploadedFile = (event: any) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleFileSubmission = () => {
    const data = new FormData();
    if(selectedFile){
      data.append('file', selectedFile);
      axios.post('http://localhost:3333/api/files', data).then(response => {
        setShowCode(true);
      });
    }
  }

  const handleModalClose = () => {
    setShowCode(false);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <>
      <Typography variant="h3">Welcome to File Sharing</Typography>
      <div className={styles.actions}>
        <div className={styles.action}>
          <FileUpload label="upload" uploadHandler={handleUploadedFile}>
            <Upload className={styles.download} />
          </FileUpload>
          <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleFileSubmission}>
            <Send />
          </IconButton>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className={styles.action}>
          <ReactCodeInput inputMode="numeric" name="fileCode" type="number" fields={6} />
          <Button variant="contained" endIcon={<Download />}>
            Download
          </Button>
        </div>
      </div>
      <Modal
        open={showCode}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default App;
