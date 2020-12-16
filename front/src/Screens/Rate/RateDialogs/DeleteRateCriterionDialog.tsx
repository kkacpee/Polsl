import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../../Actions/AlertActions';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { DeleteRateCriterion } from '../../../Actions/RateActions';

interface DialogProps {
  fetch: () => void,
  id: number
}

const DeleteRateCriterionDialog = (props:DialogProps) => {
    const {id, fetch} = props;
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    await dispatch(DeleteRateCriterion(id));  
    dispatch(setAlert(true, "success", "Deleted rate criterion successfully"));
    setOpen(false);
  }
  return (
    <div>
        <IconButton aria-label="delete" onClick={handleClickOpen} color="inherit">
            <Delete />
        </IconButton>
        <Dialog open={open} onClose={handleClose} onExit={fetch} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Do you want to delete this rate criterion?</DialogTitle>
        <DialogActions>
           <Button onClick={handleClose} >
            Cancel
            </Button>
            <Button onClick={handleSubmit} color="secondary">
            Yes
            </Button>
        </DialogActions>
        </Dialog>
    </div>
    );
}

export default DeleteRateCriterionDialog;