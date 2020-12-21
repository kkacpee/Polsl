import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { AddPointOfInterestIcon } from '../../../Actions/PointOfInterestActions';
import { AddPointOfInterestIconRequest } from '../../../Types/PointOfInterestTypes';
import Add from '@material-ui/icons/AddPhotoAlternateOutlined';
import { IconButton } from '@material-ui/core';

interface DialogProps {
  dialogTitle: string,
  fetch: () => void
}

const AddPointOfInterestIconDialog = (props:DialogProps) => {
    const {dialogTitle, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | undefined>(undefined);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCapture = ({ target }: any) => {
    setFile(target.files[0]);
  }
  async function handleSubmit(){
    const request:AddPointOfInterestIconRequest = {
        photo: file!
    }
    await dispatch(AddPointOfInterestIcon(request));  
    setOpen(false);
  }
  return (
    <div>
        <IconButton aria-label={`star`}
                title="Add icon"
                onClick={handleClickOpen}> <Add /> </IconButton>
        <Dialog open={open} onClose={handleClose} onExit={fetch} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <form>
        <DialogContent>
            <Button
            variant="contained"
            component="label"
            >
            Upload File
            <input
                type="file"
                hidden
                required
                onChange={handleCapture}
                accept=".jpg, .png"
            />
            </Button>
            <span style={{marginLeft: 10}}>{file?.name}</span>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} >
            Cancel
            </Button>
            <Button onClick={handleSubmit} color="secondary">
            Submit
            </Button>
        </DialogActions>
        </form>
        </Dialog>
    </div>
    );
}

export default AddPointOfInterestIconDialog;