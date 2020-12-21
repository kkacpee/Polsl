import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { EditParticipant } from '../../Actions/ParticipantActions';
import { Participant } from '../../Types/ParticipantTypes';

interface DialogProps {
  dialogTitle: string,
  data: Participant,
  fetch: () => void
}

const EditParticipantDialog = (props:DialogProps) => {
    const {dialogTitle, data, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [affiliation, setAffiliation] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [description, setDescription] = React.useState('');

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setCompany(data.company);
    setAffiliation(data.affiliation);
    setCountry(data.country);
    setDescription(data.description);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:Participant = {
        id: data.id,
        firstName: firstName,
        lastName: lastName,
        affiliation: affiliation,
        company: company,
        country: country,
        description: description,
        photo: data.photo
    }
    await dispatch(EditParticipant(request));  
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

export default EditParticipantDialog;