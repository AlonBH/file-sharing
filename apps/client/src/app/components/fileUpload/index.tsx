import { Button } from '@mui/material';

interface FileUploadProps {
  label: string,
  children: React.ReactNode,
  uploadHandler: React.ChangeEventHandler
}

export const FileUpload = ({ label, uploadHandler, children }: FileUploadProps) => {
  return (
    <form>
      <Button
        variant="contained"
        component="label"
        endIcon={children}>
        {label}
        <input
          type="file"
          hidden
          onChange={uploadHandler}
        />
      </Button>
    </form>
  );
}
