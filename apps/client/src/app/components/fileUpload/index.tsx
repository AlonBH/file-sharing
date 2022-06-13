import { Button } from '@mui/material';

export const FileUpload = () => {
  return (
    <Button
  variant="contained"
  component="label">
  Upload File
  <input
    type="file"
    hidden
  />
</Button>
  );
}
