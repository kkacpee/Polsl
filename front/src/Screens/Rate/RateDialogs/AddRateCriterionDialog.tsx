import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container as FloatingContainer, Button as FloatingButton} from 'react-floating-action-button';
import { useDispatch } from 'react-redux';
import { AddRateCriterion, GetRateCriterionTypeList } from '../../../Actions/RateActions';
import { AddRateCriterionRequest, RateState } from '../../../Types/RateTypes';
import { Add } from '@material-ui/icons';
import { MenuItem } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducers/rootReducer';
import _ from 'lodash';

interface DialogProps {
  dialogTitle: string,
  fetch: () => void
}

const AddRateCriterionDialog = (props:DialogProps) => {
    const {dialogTitle, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [rateCriterionTypeID, setRateCriterionTypeID] = React.useState(0);
  const [rateCriterionTypeName, setRateCriterionTypeName] = React.useState('');

  const rateState:RateState = useSelector((state: RootState ) => state.Rate);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    if(_.isEmpty(rateState.types)){
      FetchTypes();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function FetchTypes () {
    await dispatch(GetRateCriterionTypeList())
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let CritType = rateState.types?.find(e => e.name === event.target.value);
    setRateCriterionTypeID(CritType!.id);
    setRateCriterionTypeName(CritType!.name);
  };

  async function handleSubmit(){
    const request:AddRateCriterionRequest = {
        name: name,
        rateCriterionTypeID: rateCriterionTypeID
    }
    await dispatch(AddRateCriterion(request));  
    setOpen(false);
  }
  return (
    <div>
        <FloatingContainer>
        <FloatingButton
                tooltip="Add new point of interest"
                onClick={handleClickOpen}> <Add /> </FloatingButton>
        </FloatingContainer>
        <Dialog open={open} onClose={handleClose} onExit={fetch} aria-labelledby="form-dialog-title" fullWidth={true}>
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
           <div>
            <TextField
            required
            style={{ marginBottom: 8, width: '20%'}}
            id="rateCriterionTypeID"
            label="TypeID"
            variant="outlined"
            value={rateCriterionTypeID} 
            disabled
            />
            <TextField
            required
            select
            style={{ marginBottom: 8 , width: '80%'}}
            id="rateCriterionTypeName"
            label="TypeName"
            variant="outlined"
            value={rateCriterionTypeName} 
            onChange={handleChange}
            >
                {rateState.types!.map((data) => {
                    return (
                        <MenuItem key={data.id} value={data.name}>{data.name}</MenuItem>
                    )})}
            </TextField>
            </div>
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

export default AddRateCriterionDialog;