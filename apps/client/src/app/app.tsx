// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { FileUpload } from './components/fileUpload';

export function App() {
  return (
    <>
      <h1>Welcome to File Sharing</h1>
      <FileUpload />
    </>
  );
}

export default App;
