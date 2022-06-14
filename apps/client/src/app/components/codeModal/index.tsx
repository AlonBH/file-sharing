import React from 'react';
import { Dialog, Box, Typography, IconButton, DialogTitle, DialogContent, DialogContentText, Button, DialogActions } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

import './styles.scss';

interface CodeModalProps {
  code: string;
  showModal: boolean,
  handleModalClose(): void
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
        {"To download the file:"}
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
