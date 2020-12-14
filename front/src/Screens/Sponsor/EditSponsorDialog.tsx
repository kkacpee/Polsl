import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../Actions/AlertActions';
import { EditSponsor } from '../../Actions/SponsorActions';
import { Sponsor } from '../../Types/SponsorTypes';

interface DialogProps {
  dialogTitle: string,
  data: Sponsor,
  fetch: () => void
}

const EditSponsorDialog = (props:DialogProps) => {
    const {dialogTitle, data, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [logoPath, setLogoPath] = React.useState('');
  const [website, setWebsite] = React.useState('');

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setName(data.name);
    setCountry(data.country);
    setDescription(data.description);
    setLogoPath(data.logoPath);
    setWebsite(data.website);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:Sponsor = {
        id: data.id,
        name: name,
        country: country,
        description: description,
        logoPath: logoPath,
        website: website
    }
    await dispatch(EditSponsor(request));  
    dispatch(setAlert(true, "success", "Edited sponsor successfully"));
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
            id="country"
            label="Country"
            variant="outlined"
            value={country} 
            onChange={(e) => setCountry(e.target.value)}
            />
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="logoPath"
            label="LogoPath"
            variant="outlined"
            value={logoPath} 
            onChange={(e) => setLogoPath(e.target.value)}
            />
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="website"
            label="Website"
            variant="outlined"
            value={website} 
            onChange={(e) => setWebsite(e.target.value)}
            />
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

export default EditSponsorDialog;