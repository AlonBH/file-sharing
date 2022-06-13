import { Divider, Button } from '@mui/material';
import { Upload, Download } from '@mui/icons-material';
import ReactCodeInput from 'react-code-input'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { FileUpload } from './components/fileUpload';

export function App() {
  return (
    <>
      <h1>Welcome to File Sharing</h1>
      <div className={styles.actions}>
        <FileUpload label="upload">
          <Upload />
        </FileUpload>
        <Divider orientation="vertical" flexItem />
        <div className={styles.download}>
          <ReactCodeInput inputMode="numeric" name="fileCode" type="number" fields={6} />
          <Button variant="contained" endIcon={<Download />}>
            Download
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
