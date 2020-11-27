import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container as FloatingContainer, Button as FloatingButton} from 'react-floating-action-button';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../Actions/AlertActions';
import { AddPointOfInterest } from '../../Actions/PointOfInterestActions';
import { AddPointOfInterestRequest } from '../../Types/PointOfInterestTypes';
import { Add } from '@material-ui/icons';

interface DialogProps {
  dialogTitle: string,
  fetch: () => void
}

const initial:AddPointOfInterestRequest = {
    name: '',
    address: '',
    description: '',
    contact: '',
    pointOfInterestTypeID: 0
}

const FormDialog = (props:DialogProps) => {
    const {dialogTitle, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(initial.name);
  const [address, setAddress] = React.useState(initial.address);
  const [description, setDescription] = React.useState(initial.description);
  const [contact, setContact] = React.useState(initial.contact);
  const [pointOfInterestTypeID, setPointOfInterestTypeID] = React.useState(initial.pointOfInterestTypeID);


  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetType = (text:string) => {
      setPointOfInterestTypeID(1);
  }

  async function handleSubmit(){
    const request:AddPointOfInterestRequest = {
        name: name,
        address: address,
        description: description,
        contact: contact,
        pointOfInterestTypeID: pointOfInterestTypeID
    }
    await dispatch(AddPointOfInterest(request));  
    dispatch(setAlert(true, "success", "Added conference successfully"));
    setOpen(false);
  }
  return (
    <div>
        <FloatingContainer>
        <FloatingButton
                tooltip="Add new point of interest"
                onClick={handleClickOpen}> <Add /> </FloatingButton>
        </FloatingContainer>
        <Dialog open={open} onClose={handleClose} onExit={fetch} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <form>
        <DialogContent>
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="name"
            label="Name"
            variant="outlined"
            value={name} 
            onChange={(e) => setName(e.target.value)}
            />
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="address"
            label="Address"
            variant="outlined"
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="contact"
            label="Contact"
            variant="outlined"
            value={contact} 
            onChange={(e) => setContact(e.target.value)}
            />
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="pointOfInterestTypeID"
            label="Type"
            variant="outlined"
            value={pointOfInterestTypeID} 
            onChange={(e) => handleSetType(e.target.value)}
            />
            <TextField
            required
            fullWidth
            multiline
            style={{ marginBottom: 8 }}
            id="description"
            label="Description"
            variant="outlined"
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            />
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

export default FormDialog;