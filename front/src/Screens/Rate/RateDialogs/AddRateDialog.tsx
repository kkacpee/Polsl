import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container as FloatingContainer, Button as FloatingButton} from 'react-floating-action-button';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../../Actions/AlertActions';
import { AddRate, GetRateCriterionList } from '../../../Actions/RateActions';
import { AddRateRequest, RateState } from '../../../Types/RateTypes';
import { Add } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating/Rating';
import { Box, MenuItem, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducers/rootReducer';
import { ConferenceState } from '../../../Types/ConferenceTypes';
import { PresentationState } from '../../../Types/PresentationTypes';
import _ from 'lodash';

interface DialogProps {
  dialogTitle: string,
  fetch: () => void,
  id: number,
  isConferenceRate: boolean
}

const AddRateDialog = (props:DialogProps) => {
    const {dialogTitle, id, fetch, isConferenceRate} = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [mobileUserID, setMobileUserID] = React.useState(0);
  const [rateCriterionID, setRateCriterionID] = React.useState(0);
  const [rateCriterionName, setRateCriterionName] = React.useState('');

  const dispatch = useDispatch();
  const rateState:RateState = useSelector((state: RootState ) => state.Rate);

  const handleClickOpen = () => {
    if(_.isEmpty(rateState.criterions)){
      FetchTypes();
    }
    setOpen(true);
  };

  async function FetchTypes () {
    await dispatch(GetRateCriterionList())
  }

  const handleChangeCriterion = (event: React.ChangeEvent<{ value: unknown }>) => {
    let RateCriterion = rateState.criterions?.find(e => e.name === event.target.value);
    setRateCriterionID(RateCriterion!.id);
    setRateCriterionName(RateCriterion!.name);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:AddRateRequest = {
        description: description,
        value: value,
        mobileUserID: mobileUserID,
        rateCriterionID: rateCriterionID,
        conferenceID: isConferenceRate ? Number(id) : null,
        presentationID: isConferenceRate ? null : Number(id)
    }
    await dispatch(AddRate(request));  
    dispatch(setAlert(true, "success", "Added sponsor successfully"));
    setOpen(false);
  }
  return (
    <div>
        <Button onClick={handleClickOpen}>
            Add
        </Button>
        <Dialog open={open} onClose={handleClose} onExit={fetch} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <form>
        <DialogContent>
        <TextField
            required
            fullWidth
            type="number"
            id="mobileUserID"
            label="Mobile User ID"
            variant="outlined"
            value={mobileUserID} 
            onChange={(e) => setMobileUserID(Number(e.target.value))}
            />    
            <div>
            <Box component="fieldset" mb={1} ml={0} mr={0} mt={0} borderRadius="100">
            <Typography component="legend"> Value </Typography>
            <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                setValue(Number(newValue));
            }} />
            </Box>
            </div>
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            multiline
            id="description"
            label="Description"
            variant="outlined"
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            />
           <div>
            <TextField
            required
            style={{ marginBottom: 8, width: '20%'}}
            id="rateCriterionID"
            label="CriterionID"
            variant="outlined"
            value={rateCriterionID} 
            disabled
            />
            <TextField
            required
            select
            style={{ marginBottom: 8 , width: '80%'}}
            id="rateCriterionName"
            label="Criterion Name"
            variant="outlined"
            value={rateCriterionName} 
            onChange={handleChangeCriterion}
            >
                {rateState.criterions!.map((data) => {
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

export default AddRateDialog;