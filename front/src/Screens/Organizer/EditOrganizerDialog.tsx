import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../Actions/AlertActions';
import { EditOrganizer } from '../../Actions/OrganizerActions';
import { Organizer } from '../../Types/OrganizerTypes';

interface DialogProps {
  dialogTitle: string,
  data: Organizer,
  fetch: () => void
}

const EditOrganizerDialog = (props:DialogProps) => {
    const {dialogTitle, data, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [affiliation, setAffiliation] = React.useState('');
  const [contact, setContact] = React.useState('');

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setCompany(data.company);
    setAffiliation(data.affiliation);
    setContact(data.contact);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:Organizer = {
    id: data.id,
    firstName: firstName,
    lastName: lastName,
    affiliation: affiliation,
    company: company,
    contact: contact
    }
    await dispatch(EditOrganizer(request));  
    dispatch(setAlert(true, "success", "Edited organizer successfully"));
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

export default EditOrganizerDialog;