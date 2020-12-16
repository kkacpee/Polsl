import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Image from 'material-ui-image';
import { GridList, GridListTile } from '@material-ui/core';
import { PointOfInterestIcon } from '../../../Types/PointOfInterestTypes';

interface DialogProps {
  dialogTitle: string,
  photos: PointOfInterestIcon[],
  setPhotoId: any
}

const ShowPointOfInterestPhotoDialog = (props:DialogProps) => {
    const {dialogTitle, photos, setPhotoId} = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTileClick = (id:number) => {
    setPhotoId(id);
    setOpen(false);
  }

  return (
    <div>
        <Button
        onClick={handleClickOpen}> 
            Show images
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth='md'>
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
            <GridList cols={3} cellHeight={300}>
                {photos.map((photo) => (
                    <GridListTile  key={photo.path} cols={1} onClick={() => {handleTileClick(photo.id)}}>
                        <Image
                                src={`${process.env.REACT_APP_SERVER_RESOURCE_URI as string}${photo.path}`}
                            />
                    </GridListTile>
                    ))}
            </GridList>
        <form>
        <DialogContent>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} >
            Cancel
            </Button>
        </DialogActions>
        </form>
        </Dialog>
    </div>
    );
}

export default ShowPointOfInterestPhotoDialog;