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
import { AddParticipant } from '../../Actions/ParticipantActions';
import { AddParticipantRequest } from '../../Types/ParticipantTypes';
import { Add } from '@material-ui/icons';

interface DialogProps {
  dialogTitle: string,
  fetch: () => void
}

const initial:AddParticipantRequest = {
    firstName: '',
    lastName: '',
    affiliation: '',
    company: '',
    country: '',
    description: ''
}

const FormDialog = (props:DialogProps) => {
    const {dialogTitle, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState(initial.firstName);
  const [lastName, setLastName] = React.useState(initial.lastName);
  const [company, setCompany] = React.useState(initial.company);
  const [affiliation, setAffiliation] = React.useState(initial.affiliation);
  const [country, setCountry] = React.useState(initial.country);
  const [description, setDescription] = React.useState(initial.description);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:AddParticipantRequest = {
        firstName: firstName,
        lastName: lastName,
        affiliation: affiliation,
        company: company,
        country: country,
        description: description
    }
    await dispatch(AddParticipant(request));  
    dispatch(setAlert(true, "success", "Added conference successfully"));
    setOpen(false);
  }
  return (
    <div>
        <FloatingContainer>
        <FloatingButton
                tooltip="Add new participant"
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
            id="firstName"
            label="First Name"
            variant="outlined"
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="lastName"
            label="Last Name"
            variant="outlined"
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="company"
            label="Company"
            variant="outlined"
            value={company} 
            onChange={(e) => setCompany(e.target.value)}
            />
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="affiliation"
            label="Affiliation"
            variant="outlined"
            value={affiliation} 
            onChange={(e) => setAffiliation(e.target.value)}
            />
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="country"
            label="Country"
            variant="outlined"
            value={country} 
            onChange={(e) => setCountry(e.target.value)}
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