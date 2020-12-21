import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Image from 'material-ui-image';

interface DialogProps {
  dialogTitle: string,
  photo: string,
  fetch: () => void
}

const ShowParticipantPhotoDialog = (props:DialogProps) => {
    const {dialogTitle, photo, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [path, setPath] = React.useState('');
  const [file, setFile] = React.useState<File | undefined>(undefined)

  const handleClickOpen = () => {
    setFile(undefined);
    setPath(`${process.env.REACT_APP_SERVER_RESOURCE_URI as string}${photo}`);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCapture = ({ target }: any) => {
    setFile(target.files[0]);
    setPath(URL.createObjectURL(target.files[0]));
  }

  async function handleSubmit(){
    setOpen(false);
  }
  return (
    <div>
        <Button
        onClick={handleClickOpen}> 
            Show 
        </Button>
        <Dialog open={open} onClose={handleClose} onExit={fetch} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <Image
                    src={`${path}`}
                />
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
            <Button onClick={handleSubmit} color="secondary">
            Edit
            </Button>
        </DialogActions>
        </form>
        </Dialog>
    </div>
    );
}

export default ShowParticipantPhotoDialog;