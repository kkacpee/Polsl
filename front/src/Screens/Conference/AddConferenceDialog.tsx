import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container as FloatingContainer, Button as FloatingButton} from 'react-floating-action-button';
import { useDispatch } from 'react-redux';
import { AddConferenceRequest } from '../../Types/ConferenceTypes';
import { AddConference} from '../../Actions/ConferenceActions';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

interface DialogProps {
  dialogTitle: string,
  fetch: () => void
}

const initial:AddConferenceRequest = {
  address: "",
  country: "",
  description:"",
  startDate: new Date(),
  endDate: new Date(),
  title: "",
  socialMedia: ""
}

const FormDialog = (props:DialogProps) => {
    const {dialogTitle, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState(initial.address);
  const [title, setTitle] = React.useState(initial.title);
  const [country, setCountry] = React.useState(initial.country);
  const [description, setDescription] = React.useState(initial.description);
  const [socialMedia, setSocialMedia] = React.useState(initial.socialMedia);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const request:AddConferenceRequest = {
      address: address,
      country: country,
      description: description,
      startDate: startDate!,
      endDate: endDate!,
      title: title,
      socialMedia: socialMedia
    }
    console.log(request)
    dispatch(AddConference(request));
    handleClose();
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
            id="description"
            label="Description"
            variant="outlined"
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
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