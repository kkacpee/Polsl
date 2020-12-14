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
import { AddRate } from '../../../Actions/RateActions';
import { AddRateRequest, RateState } from '../../../Types/RateTypes';
import { Add } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating/Rating';
import { Box, MenuItem, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducers/rootReducer';

interface DialogProps {
  dialogTitle: string,
  fetch: () => void
}

const FormDialog = (props:DialogProps) => {
    const {dialogTitle, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [mobileUserID, setMobileUserID] = React.useState(0);
  const [rateCriterionID, setRateCriterionID] = React.useState(0);
  const [rateCriterionName, setRateCriterionName] = React.useState('');
  const [conferenceID, setConferenceID] = React.useState(0);
  const [conferenceName, setConferenceName] = React.useState('');
  const [presentationID, setPresentationID] = React.useState(0);
  const [presentationName, setPresentationName] = React.useState('');

  const dispatch = useDispatch();
  const rateState:RateState = useSelector((state: RootState ) => state.Rate);

  const handleClickOpen = () => {
    setOpen(true);
  };

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
        conferenceID: conferenceID,
        presentationID: presentationID
    }
    await dispatch(AddRate(request));  
    dispatch(setAlert(true, "success", "Added sponsor successfully"));
    setOpen(false);
  }
  return (
    <div>
        <FloatingContainer>
        <FloatingButton
                tooltip="Add new sponsor"
                onClick={handleClickOpen}> <Add /> </FloatingButton>
        </FloatingContainer>
        <Dialog open={open} onClose={handleClose} onExit={fetch} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <form>
        <DialogContent>
        <TextField
            required
            fullWidth
            type="number"
            style={{ marginBottom: 8 }}
            id="mobileUserID"
            label="Mobile User ID"
            variant="outlined"
            value={mobileUserID} 
            onChange={(e) => setMobileUserID(Number(e.target.value))}
            />
            <Box component="fieldset" mb={3} borderColor="#fff">
            <Typography component="legend"> Value </Typography>
            <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                setValue(Number(newValue));
            }} />
            </Box>
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
            label="TypeName"
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

export default FormDialog;