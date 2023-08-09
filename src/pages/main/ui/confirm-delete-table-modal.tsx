import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

type ConfirmDeleteTableModalProps = {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
};

export const ConfirmDeleteTableModal = (props: ConfirmDeleteTableModalProps) => {
    const { open, handleClose, handleConfirm } = props;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Ви впевнені, що хочете видалити?</DialogTitle>
            <DialogContent>
                <DialogContentText>Підтвердивши видалення дані видаляться безповоротно</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Відміна
                </Button>
                <Button onClick={handleConfirm} color="error">
                    Видалити
                </Button>
            </DialogActions>
        </Dialog>
    );
};
