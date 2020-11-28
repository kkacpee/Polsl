import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../Actions/AlertActions';
import { EditAccommodation } from '../../Actions/AccommodationActions';
import { Accommodation} from '../../Types/AccommodationTypes';

interface DialogProps {
  dialogTitle: string,
  data: Accommodation,
  fetch: () => void
}

const EditAccommodationDialog = (props:DialogProps) => {
    const {dialogTitle, data, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [website, setWebsite] = React.useState("");

  const dispatch = useDispatch();

  const handleClickOpen = () => {
      setName(data.name);
      setNumber(data.number);
      setAddress(data.address);
      setWebsite(data.website);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:Accommodation = {
        id: data.id,
        name: name,
        number: number,
        address: address,
        website: website
    }
    await dispatch(EditAccommodation(request));  
    dispatch(setAlert(true, "success", "Edited accommodation successfully"));
    fetch();
    setOpen(false);
  }
  return (
    <div>
        <Button
        onClick={handleClickOpen}> 
            Edit 
        </Button>
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
            id="number"
            label="Number"
            variant="outlined"
            value={number} 
            onChange={(e) => setNumber(e.target.value)}
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
            id="website"
            label="Website"
            variant="outlined"
            value={website} 
            onChange={(e) => setWebsite(e.target.value)}
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

export default EditAccommodationDialog;