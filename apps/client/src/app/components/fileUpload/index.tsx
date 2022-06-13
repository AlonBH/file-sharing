import { Button } from '@mui/material';

interface FileUploadProps {
  label: string,
  children: React.ReactNode
}

export const FileUpload = ({label, children}: FileUploadProps) => {
  return (
    <Button
      variant="contained"
      component="label"
      endIcon={children}>
      {label}
      <input
        type="file"
        hidden
      />
    </Button>
  );
}
