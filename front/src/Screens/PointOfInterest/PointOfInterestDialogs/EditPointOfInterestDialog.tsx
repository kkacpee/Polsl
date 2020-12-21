import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { EditPointOfInterest } from '../../../Actions/PointOfInterestActions';
import { PointOfInterest, PointOfInterestState } from '../../../Types/PointOfInterestTypes';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducers/rootReducer';

interface DialogProps {
  dialogTitle: string,
  data: PointOfInterest,
  fetch: () => void
}

const EditPointOfInterestDialog = (props:DialogProps) => {
    const {dialogTitle, data, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [pointOfInterestTypeID, setPointOfInterestTypeID] = React.useState(0);
  const [pointOfInterestTypeName, setPointOfInterestTypeName] = React.useState('');

const pointOfInterestState:PointOfInterestState = useSelector((state: RootState ) => state.PointOfInterest);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
      setName(data.name);
      setAddress(data.address);
      setDescription(data.description);
      setContact(data.contact);
      setPointOfInterestTypeID(data.pointOfInterestTypeID);
      setPointOfInterestTypeName(data.pointOfInterestTypeName);
    setOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let PoIType = pointOfInterestState.types?.find(e => e.name === event.target.value);
    setPointOfInterestTypeID(PoIType!.id);
    setPointOfInterestTypeName(PoIType!.name);
  };


  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:PointOfInterest = {
        id: data.id,
        name: name,
        address: address,
        description: description,
        contact: contact,
        pointOfInterestTypeID: pointOfInterestTypeID,
        pointOfInterestTypeName: pointOfInterestTypeName
    }
    await dispatch(EditPointOfInterest(request));  
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
            <div>
            <TextField
            required
            style={{ marginBottom: 8, width: '20%'}}
            id="pointOfInterestTypeID"
            label="TypeID"
            variant="outlined"
            value={pointOfInterestTypeID} 
            onChange={(e) => setPointOfInterestTypeName(e.target.value)}
            disabled
            />
            <TextField
            required
            select
            style={{ marginBottom: 8 , width: '80%'}}
            id="pointOfInterestTypeName"
            label="TypeName"
            variant="outlined"
            value={pointOfInterestTypeName} 
            onChange={handleChange}
            >
                {pointOfInterestState.types!.map((data) => {
                    return (
                        <MenuItem key={data.id} value={data.name}>{data.name}</MenuItem>
                    )})}
            </TextField>
            </div>
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

export default EditPointOfInterestDialog;