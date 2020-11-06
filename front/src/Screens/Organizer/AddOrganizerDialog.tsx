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
import { AddOrganizer } from '../../Actions/OrganizerActions';
import { AddOrganizerRequest } from '../../Types/OrganizerTypes';

interface DialogProps {
  dialogTitle: string,
  fetch: () => void
}

const initial:AddOrganizerRequest = {
    firstName: '',
    lastName: '',
    affiliation: '',
    company: '',
    contact: ''
}

const FormDialog = (props:DialogProps) => {
    const {dialogTitle, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState(initial.firstName);
  const [lastName, setLastName] = React.useState(initial.lastName);
  const [company, setCompany] = React.useState(initial.company);
  const [affiliation, setAffiliation] = React.useState(initial.affiliation);
  const [contact, setContact] = React.useState(initial.contact);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:AddOrganizerRequest = {
        firstName: firstName,
    lastName: lastName,
    affiliation: affiliation,
    company: company,
    contact: contact
    }
    await dispatch(AddOrganizer(request));  
    dispatch(setAlert(true, "success", "Added conference successfully"));
    setOpen(false);
  }
  return (
    <div>
        <FloatingContainer>
        <FloatingButton
                tooltip="The big plus button!"
                icon="fas fa-plus"
                rotate={true}
                onClick={handleClickOpen} />
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
            id="contact"
            label="Contact"
            variant="outlined"
            value={contact} 
            onChange={(e) => setContact(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
            Submit
            </Button>
        </DialogActions>
        </form>
        </Dialog>
    </div>
    );
}

export default FormDialog;