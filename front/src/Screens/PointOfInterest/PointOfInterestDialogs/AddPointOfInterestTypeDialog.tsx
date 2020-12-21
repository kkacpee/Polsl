import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { AddPointOfInterestType, GetPointOfInterestIconList } from '../../../Actions/PointOfInterestActions';
import { AddPointOfInterestTypeRequest, PointOfInterestState } from '../../../Types/PointOfInterestTypes';
import { Add } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducers/rootReducer';
import { IconButton } from '@material-ui/core';
import _ from 'lodash';
import ShowPointOfInterestPhotoDialog from './ShowPointOfInterestIconsDialog';
import Image from 'material-ui-image';

interface DialogProps {
  dialogTitle: string,
  fetch: () => void
}

const FormDialog = (props:DialogProps) => {
    const {dialogTitle, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [photoId, setPhotoId] = React.useState(0);
  const pointOfInterestState:PointOfInterestState = useSelector((state: RootState ) => state.PointOfInterest);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    if(_.isEmpty(pointOfInterestState.icons)){
      FetchTypes();
    }
    console.log(pointOfInterestState);
    setName('');
    setPhotoId(0);
    setOpen(true);
  };

  async function FetchTypes () {
    await dispatch(GetPointOfInterestIconList())
  }

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:AddPointOfInterestTypeRequest = {
        name: name,
        pointOfInterestIconID: photoId
    }
    await dispatch(AddPointOfInterestType(request));  
    setOpen(false);
  }
  return (
    <div>
        <IconButton aria-label={`star`}
                title="Add type"
                onClick={handleClickOpen}> <Add /> </IconButton>
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
            <div>
            <ShowPointOfInterestPhotoDialog dialogTitle="test" photos={pointOfInterestState.icons} setPhotoId={setPhotoId}/>
            {(photoId !== 0) ?
              <Image
            src={`${process.env.REACT_APP_SERVER_RESOURCE_URI as string}${pointOfInterestState.icons.find(x => x.id === photoId)?.path}`}
             />
             :
             null
            }
            
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