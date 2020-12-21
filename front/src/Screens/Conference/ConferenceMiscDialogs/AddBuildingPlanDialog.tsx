import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { AddBuildingPlanRequest } from '../../../Types/BuildingPlanTypes';
import { AddBuildingPlan } from '../../../Actions/BuildingPlanActions';

interface DialogProps {
  dialogTitle: string,
  id: number,
  fetch: () => void
}

const AddBuildingPlanDialog = (props:DialogProps) => {
    const {dialogTitle, id, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [file, setFile] = React.useState<File | undefined>(undefined);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setName('');
    setDescription('');
    setFile(undefined);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCapture = ({ target }: any) => {
    setFile(target.files[0]);
  }
  async function handleSubmit(){
    const request:AddBuildingPlanRequest = {
      name: name,
      file: file!,
      description: description,
      conferenceId: id
    }
    await dispatch(AddBuildingPlan(request));  
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
            id="name"
            label="Name"
            variant="outlined"
            value={name} 
            onChange={(e) => setName(e.target.value)}
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
            <Button
            variant="contained"
            component="label"
            >
            Upload File
            <input
                type="file"
                hidden
                required
                onChange={handleCapture}
                accept=".jpg, .png"
            />
            </Button>
            <span style={{marginLeft: 10}}>{file?.name}</span>
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

export default AddBuildingPlanDialog;