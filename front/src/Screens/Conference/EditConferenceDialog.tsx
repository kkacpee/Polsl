import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { Conference, ConferenceDetails } from '../../Types/ConferenceTypes';
import { EditConference} from '../../Actions/ConferenceActions';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { setAlert } from '../../Actions/AlertActions';

interface DialogProps {
  dialogTitle: string,
  details: ConferenceDetails,
  fetch: () => void
}

const EditDialog = (props:DialogProps) => {
    const {dialogTitle, details, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [socialMedia, setSocialMedia] = React.useState("");
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setAddress(details.address);
    setCountry(details.country);
    setDescription(details.description);
    setStartDate(details.startDate);
    setEndDate(details.endDate);
    setTitle(details.title);
    setSocialMedia(details.socialMedia);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:Conference = {
        id: details.id,
      address: address,
      country: country,
      description: description,
      startDate: startDate!,
      endDate: endDate!,
      title: title,
      socialMedia: socialMedia
    }
    await dispatch(EditConference(request));  
    dispatch(setAlert(true, "success", "Edited conference successfully"));
    setOpen(false);
  }
  return (
    <div>
        <Button onClick={handleClickOpen}>
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
            id="title"
            label="Title"
            variant="outlined"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
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
            id="socialmedia"
            label="Social Media"
            variant="outlined"
            value={socialMedia} 
            onChange={(e) => setSocialMedia(e.target.value)}
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
            <div>
            <KeyboardDateTimePicker
              id="startdate"
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              className="w-50 p-1"
              onError={console.log}
              minDate={new Date("2018-01-01T00:00")}
              format="yyyy/MM/dd hh:mm a"
            />
            <KeyboardDateTimePicker
              id="enddate"
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              className="w-50 p-1"
              onError={console.log}
              minDate={new Date("2018-01-01T00:00")}
              format="yyyy/MM/dd hh:mm a"
            />
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

export default EditDialog;