import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../../Actions/AlertActions';
import { EditPointOfInterestType, GetPointOfInterestIconList } from '../../../Actions/PointOfInterestActions';
import { PointOfInterestState, PointOfInterestType } from '../../../Types/PointOfInterestTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducers/rootReducer';
import _ from 'lodash';
import ShowPointOfInterestPhotoDialog from './ShowPointOfInterestIconsDialog';
import Image from 'material-ui-image';

interface DialogProps {
  dialogTitle: string,
  fetch: () => void,
  data: PointOfInterestType
}

const EditPointOfInterestTypeDialog = (props:DialogProps) => {
    const {dialogTitle, fetch, data} = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [photoId, setPhotoId] = React.useState(0);
  const pointOfInterestState:PointOfInterestState = useSelector((state: RootState ) => state.PointOfInterest);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    if(_.isEmpty(pointOfInterestState.icons)){
      FetchTypes();
    }
    setName(data.name);
    setPhotoId(data.pointOfInterestIconID);
    setOpen(true);
  };

  async function FetchTypes () {
    await dispatch(GetPointOfInterestIconList())
  }

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:PointOfInterestType = {
        id: data.id,
        name: name,
        pointOfInterestIconID: photoId
    }
    await dispatch(EditPointOfInterestType(request));  
    dispatch(setAlert(true, "success", "Edited point of interest type successfully"));
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
            id="name"
            label="Name"
            variant="outlined"
            value={name} 
            onChange={(e) => setName(e.target.value)}
            />
            <div>
            <ShowPointOfInterestPhotoDialog dialogTitle="test" photos={pointOfInterestState.icons} setPhotoId={setPhotoId}/>
            {(photoId != 0) ?
              <Image
            src={`${process.env.REACT_APP_SERVER_RESOURCE_URI as string}${pointOfInterestState.icons.find(x => x.id == photoId)?.path}`}
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

export default EditPointOfInterestTypeDialog;