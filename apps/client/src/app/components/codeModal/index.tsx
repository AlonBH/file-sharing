import React from 'react';
import { Dialog, IconButton, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

interface CodeModalProps {
  code: string;
  showModal: boolean,
  handleModalClose(): void
}

export const CodeModal = ({ code, showModal, handleModalClose }: CodeModalProps) => {

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  }

  return (
    <Dialog
      open={showModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle id="alert-dialog-title">
        To download the file
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {code}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <IconButton color="primary" aria-label="upload picture" component="span" onClick={copyToClipboard}>
          <ContentCopy />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
