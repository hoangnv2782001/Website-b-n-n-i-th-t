import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const DeleteDialog = ({ title, message, open, handleSubmit, handleCancel }) => {

 

  console.log('dialog duoc goi', title, message, open, handleSubmit, handleCancel)
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancel}
      aria-describedby="alert-dialog-slide-description"
      sx={{zIndex:1400}}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Ok</Button>
        <Button onClick={handleCancel}>Huỷ</Button>
      </DialogActions>
    </Dialog>
  );
};

/**
 * Hieu ứng xuất hiện của dialog
 */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
