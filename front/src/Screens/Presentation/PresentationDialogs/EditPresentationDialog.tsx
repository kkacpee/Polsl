import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { setAlert } from '../../../Actions/AlertActions';
import { AddPresentationRequest, Presentation, PresentationDetails, PresentationState } from '../../../Types/PresentationTypes';
import { AddPresentation, EditPresentation, GetPresentationTypes } from '../../../Actions/PresentationActions';
import { MenuItem } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducers/rootReducer';

interface DialogProps {
  dialogTitle: string,
  details: PresentationDetails,
  fetch: () => void
}

const EditPresentationDialog = (props:DialogProps) => {
    const {dialogTitle, details, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [authors, setAuthors] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [place, setPlace] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());
  const [presentationTypeID, setPresetnationTypeID] = React.useState(0);
  const [presentationTypeName, setPresentationTypeName] = React.useState('');

  const dispatch = useDispatch();
  const presentationState:PresentationState = useSelector((state: RootState ) => state.Presentation);
  const handleClickOpen = () => {
    setAuthors(details.authors);
    setTitle(details.title);
    setPlace(details.place);
    setDescription(details.description);
    setPresentationTypeName(details.presentationTypeName);
    setPresetnationTypeID(details.presentationTypeID);
    setStartDate(details.startDate);
    setEndDate(details.endDate);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect( () => {
    FetchData()
  }, []);

  async function FetchData () {
    await dispatch(GetPresentationTypes())
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let PoIType = presentationState.types?.find(e => e.name === event.target.value);
    setPresetnationTypeID(PoIType!.id);
    setPresentationTypeName(PoIType!.name);
  };

  async function handleSubmit(){
    const request:Presentation = {
        id: details.id,
      authors: authors,
      place: place,
      description: description,
      startDate: startDate!,
      endDate: endDate!,
      title: title,
      conferenceID: Number(details.conferenceID),
      presentationTypeID: presentationTypeID
    }
    await dispatch(EditPresentation(request));  
    dispatch(setAlert(true, "success", "Added presentation successfully"));
    setOpen(false);
  }
  return (
    <div>
        <Button onClick={handleClickOpen} color='secondary'>
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
            <div>
            <TextField
            required
            style={{ marginBottom: 8, width: '20%'}}
            id="pointOfInterestTypeID"
            label="TypeID"
            variant="outlined"
            value={presentationTypeID} 
            disabled
            />
            <TextField
            required
            select
            style={{ marginBottom: 8 , width: '80%'}}
            id="pointOfInterestTypeName"
            label="TypeName"
            variant="outlined"
            value={presentationTypeName} 
            onChange={handleChange}
            >
                {presentationState.types!.map((data) => {
                    return (
                        <MenuItem key={data.id} value={data.name}>{data.name}</MenuItem>
                    )})}
            </TextField>
            </div>
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

export default EditPresentationDialog;