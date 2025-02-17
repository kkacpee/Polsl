import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { EditEmergencyNumber } from '../../Actions/EmergencyNumberActions';
import { EmergencyNumber} from '../../Types/EmergencyNumberTypes';

interface DialogProps {
  dialogTitle: string,
  data: EmergencyNumber,
  fetch: () => void
}

const EditEmergencyNumberDialog = (props:DialogProps) => {
    const {dialogTitle, data, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setName(data.name);
    setNumber(data.number);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:EmergencyNumber = {
        id: data.id,
        name: name,
        number: number
    }
    await dispatch(EditEmergencyNumber(request));  
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

export default EditEmergencyNumberDialog;