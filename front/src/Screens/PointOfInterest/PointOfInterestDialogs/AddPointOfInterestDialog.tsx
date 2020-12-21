import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container as FloatingContainer, Button as FloatingButton} from 'react-floating-action-button';
import { useDispatch } from 'react-redux';
import { AddPointOfInterest, GetPointOfInterestTypeList } from '../../../Actions/PointOfInterestActions';
import { AddPointOfInterestRequest, PointOfInterestState } from '../../../Types/PointOfInterestTypes';
import { Add } from '@material-ui/icons';
import { MenuItem } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducers/rootReducer';
import _ from 'lodash';

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
  const [pointOfInterestTypeName, setPointOfInterestTypeName] = React.useState('');

  const pointOfInterestState:PointOfInterestState = useSelector((state: RootState ) => state.PointOfInterest);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    if(_.isEmpty(pointOfInterestState.types)){
      FetchTypes();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function FetchTypes () {
    await dispatch(GetPointOfInterestTypeList())
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let PoIType = pointOfInterestState.types?.find(e => e.name === event.target.value);
    setPointOfInterestTypeID(PoIType!.id);
    setPointOfInterestTypeName(PoIType!.name);
  };

  async function handleSubmit(){
    const request:AddPointOfInterestRequest = {
        name: name,
        address: address,
        description: description,
        contact: contact,
        pointOfInterestTypeID: pointOfInterestTypeID
    }
    await dispatch(AddPointOfInterest(request));  
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
           <div>
            <TextField
            required
            style={{ marginBottom: 8, width: '20%'}}
            id="pointOfInterestTypeID"
            label="TypeID"
            variant="outlined"
            value={pointOfInterestTypeID} 
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

export default FormDialog;