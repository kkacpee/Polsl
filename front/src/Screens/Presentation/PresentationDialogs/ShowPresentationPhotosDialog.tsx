import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Image from 'material-ui-image';
import { AddPresentationPhotoRequest, ChangePresentationMainPhotoRequest, PresentationPhoto } from '../../../Types/PresentationTypes';
import { AddPresentationPhoto, ChangePresentationPhoto, DeletePresentationPhoto } from '../../../Actions/PresentationActions';
import { setAlert } from '../../../Actions/AlertActions';
import { useDispatch } from 'react-redux';
import { GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined'
import Star from '@material-ui/icons/Star'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

interface DialogProps {
  dialogTitle: string,
  id: number,
  photos: PresentationPhoto[],
  fetch: () => void
}

const ShowPresentationPhotoDialog = (props:DialogProps) => {
    const {dialogTitle, id, photos, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [path, setPath] = React.useState('');
  const [file, setFile] = React.useState<File | undefined>(undefined)
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setFile(undefined);
    setPath('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCapture = ({ target }: any) => {
    setFile(target.files[0]);
    setPath(URL.createObjectURL(target.files[0]));
  }

  async function handleDelete(id:number){
    await dispatch(DeletePresentationPhoto(id));
    dispatch(setAlert(true, "success", "Deleted photo successfully"));
    setOpen(false);
  }

  async function handleChangeMain(photoId:number){
    const request: ChangePresentationMainPhotoRequest = {
      photoId: photoId,
      presentationId: id
    }
    await dispatch(ChangePresentationPhoto(request));
    dispatch(setAlert(true, "success", "Changed main photo successfully"));
    setOpen(false);
  }

  async function handleUploda(){
    const request:AddPresentationPhotoRequest = {
      presentationId: id,
        file: file!
    }
    await dispatch(AddPresentationPhoto(request));  
    dispatch(setAlert(true, "success", "Added photo successfully"));
    setOpen(false);
  }
  return (
    <div>
        <Button
        onClick={handleClickOpen}> 
            Show images
        </Button>
        <Dialog open={open} onClose={handleClose} onExit={fetch} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth='md'>
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
            <GridList cols={3} cellHeight={300}>
                {photos.map((photo) => (
                    <GridListTile  key={photo.path} cols={1}>
                        <Image
                                src={`${process.env.REACT_APP_SERVER_RESOURCE_URI as string}${photo.path}`}
                            />
                         <GridListTileBar 
                         titlePosition="top"
                         actionIcon={
                           <>
                          <IconButton aria-label={`star`} onClick={() => {handleDelete(photo.id)}}>
                              <DeleteOutline />
                          </IconButton>
                          |
                          {photo.isMain ? 
                          <IconButton aria-label={`star`}>
                            <Star />
                          </IconButton>
                          :
                          <IconButton aria-label={`star`} onClick={() => {handleChangeMain(photo.id)}}>
                            <StarBorderOutlined/>
                          </IconButton>
                          }
                          </>}
                         actionPosition="right"/>
                    </GridListTile>
                    ))}
            </GridList>
        <form>
        <DialogContent>
        <Button
            variant="contained"
            component="label"
            >
            Upload new photo
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
            <Button onClick={handleUploda} color="secondary">
            Add new
            </Button>
        </DialogActions>
        </form>
        </Dialog>
    </div>
    );
}

export default ShowPresentationPhotoDialog;