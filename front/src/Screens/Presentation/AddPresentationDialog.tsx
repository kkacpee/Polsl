import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { AddConferenceRequest } from '../../Types/ConferenceTypes';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { setAlert } from '../../Actions/AlertActions';
import { AddPresentationRequest } from '../../Types/PresentationTypes';
import { AddPresentation } from '../../Actions/PresentationActions';

interface DialogProps {
  dialogTitle: string,
  id: number,
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
    const {dialogTitle, id, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [authors, setAuthors] = React.useState(initial.address);
  const [title, setTitle] = React.useState(initial.title);
  const [place, setPlace] = React.useState(initial.country);
  const [description, setDescription] = React.useState(initial.description);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:AddPresentationRequest = {
      authors: authors,
      place: place,
      description: description,
      startDate: startDate!,
      endDate: endDate!,
      title: title,
      ConferenceID: id,
      presentationTypeID: 0
    }
    await dispatch(AddPresentation(request));  
    dispatch(setAlert(true, "success", "Added presentation successfully"));
    setOpen(false);
  }
  return (
    <div>
        <Button onClick={handleClickOpen} color='secondary'>
              Add      
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
            id="place"
            label="Place"
            variant="outlined"
            value={place} 
            onChange={(e) => setPlace(e.target.value)}
            />
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="authors"
            label="Authors"
            variant="outlined"
            value={authors} 
            onChange={(e) => setAuthors(e.target.value)}
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
            <TextField
            required
            fullWidth
            multiline
            style={{ marginBottom: 8 }}
            id="select"
            label="TU BĘDZIE SELECT"
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
              showTodayButton
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

export default FormDialog;