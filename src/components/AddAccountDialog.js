import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { addAccount } from '../contexts/GlobalState';

const AddAccountDialog = ({ open, setOpen, setSnackbarOpen }) => {
    const [accountName, setAccountName] = useState('');
    const [accountBalance, setAccountBalance] = useState('');

    const handleAddAccount = () => {
        addAccount({ id: Date.now(), name: accountName, balance: accountBalance });
        setOpen(false);
        setSnackbarOpen(true);
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Add New Account</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Account Name"
                    type="text"
                    fullWidth
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Account Balance"
                    type="number"
                    fullWidth
                    value={accountBalance}
                    onChange={(e) => setAccountBalance(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleAddAccount}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAccountDialog;
