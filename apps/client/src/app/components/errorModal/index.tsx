import React from 'react';
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

interface ErrorModalProps {
  message: string,
  showModal: boolean,
  handleModalClose(): void
}

export const ErrorModal = ({message, showModal, handleModalClose}: ErrorModalProps) => {
  return (
    <Dialog
      open={showModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle id="alert-dialog-title">
        Oops!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
          <Button onClick={handleModalClose} autoFocus>
            Close
          </Button>
        </DialogActions>
    </Dialog>
  )
}
