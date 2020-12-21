import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container as FloatingContainer, Button as FloatingButton} from 'react-floating-action-button';
import { useDispatch } from 'react-redux';
import { AddRateCriterionType } from '../../../Actions/RateActions';
import { AddRateCriterionTypeRequest } from '../../../Types/RateTypes';
import { Add } from '@material-ui/icons';
import _ from 'lodash';

interface DialogProps {
  dialogTitle: string,
  fetch: () => void
}

const AddRateCriterionTypeDialog = (props:DialogProps) => {
    const {dialogTitle, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setName('');
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:AddRateCriterionTypeRequest = {
        name: name
    }
    await dispatch(AddRateCriterionType(request));  
    setOpen(false);
  }
  return (
    <div>
       <FloatingContainer>
        <FloatingButton
                tooltip="Add new sponsor"
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

export default AddRateCriterionTypeDialog;