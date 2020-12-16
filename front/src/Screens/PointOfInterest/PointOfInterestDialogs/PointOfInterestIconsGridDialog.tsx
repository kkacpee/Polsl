import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Image from 'material-ui-image';
import { setAlert } from '../../../Actions/AlertActions';
import { useDispatch } from 'react-redux';
import { GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import { PointOfInterestIcon } from '../../../Types/PointOfInterestTypes';
import { DeletePointOfInterestIcon } from '../../../Actions/PointOfInterestActions';
import GridIcon from '@material-ui/icons/GridOn'
interface DialogProps {
  dialogTitle: string,
  photos: PointOfInterestIcon[],
  fetch: () => void
}

const PointOfInterestIconsGrid = (props:DialogProps) => {
    const {dialogTitle, photos, fetch} = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  async function handleDelete(id:number){
    await dispatch(DeletePointOfInterestIcon(id));
    dispatch(setAlert(true, "success", "Deleted icon successfully"));
    setOpen(false);
  }

  return (
    <div>
        <IconButton aria-label={`star`}
                title="Add icon"
                onClick={handleClickOpen}> <GridIcon /> </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" onExit={fetch} fullWidth={true} maxWidth='md'>
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
                          </>}
                         actionPosition="right"/>
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

export default PointOfInterestIconsGrid;