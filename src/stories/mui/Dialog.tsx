import React, { useEffect } from 'react';

import { faXmark } from '@fortawesome/pro-solid-svg-icons';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AwesomeIcon from '@myex/components/AwesomeIcon';

type DialogBaseProps = Pick<MuiDialogProps, 'open' | 'fullWidth'>;

export interface DialogProps extends DialogBaseProps {
  icon?: React.ReactNode;
  title: string;
  text: string;
  button1: string;
  button2: string;
  handleClose?: () => void;
  position: string;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose?: () => void;
  position: string;
}

function BootstrapDialogTitle(props: DialogTitleProps): React.ReactElement {
  const { children, onClose, position, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, textAlign: position }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 4,
            top: 4,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <AwesomeIcon icon={faXmark} size='sm' />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export const Dialog = ({
  icon,
  title,
  text,
  button1,
  button2,
  open,
  handleClose,
  position,
  ...rest
}: DialogProps): React.ReactElement => {
  const [isOpen, setOpen] = React.useState(open);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const onClose = (): void => {
    setOpen(false);
    handleClose && handleClose();
  };

  return (
    <MuiDialog {...rest} onClose={onClose} aria-labelledby='customized-dialog-title' open={isOpen}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>{icon}</Box>
      <BootstrapDialogTitle id='customized-dialog-title' onClose={onClose} position={position}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent>
        <Typography className='mb-4'>{text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{button1}</Button>
        <Button onClick={onClose} variant='contained'>
          {button2}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

Dialog.defaultProps = {
  title: 'Heading 5',
  text: 'Body 1',
  button1: 'button1',
  button2: 'button2',
  position: 'center',
};
