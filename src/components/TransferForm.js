import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Snackbar, Alert } from '@mui/material';
import { useStore } from '@nanostores/react';
import { accountsStore, addTransfer } from '../contexts/GlobalState';

const TransferForm = ({ onClose }) => {
    const [amount, setAmount] = useState('');
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { accounts } = useStore(accountsStore);

    // TODO: Implement form validation
    const validateForm = () => {
        const errors = {};

        if (!amount || isNaN(amount) || amount <= 0) errors.amount = 'Valid amount is required';
        if (!fromAccount || isNaN(fromAccount)) errors.interestRate = 'Valid fromAccount is required';
        if (!toAccount || isNaN(toAccount)) errors.interestRate = 'Valid toAccount is required';

        return errors;
    };

    // TODO: Implement logic to handle form submission
    const handleSubmit = (e) => {
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            addTransfer({ fromAccount, toAccount, amount, date: new Date() });
            setSnackbarMessage('Deposit added successfully');
            setSnackbarOpen(true);
            setAmount('');
            setFromAccount('');
            setToAccount('');
        } else {
            setErrors(errors);
        }

        onClose();
    };

    // TODO: Implement functionality to close the snackbar
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="From Account"
                variant="outlined"
                select
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
                error={!!errors.fromAccount}
                helperText={errors.fromAccount}
                fullWidth
                name="fromAccount"
            >
                {accounts.map(account => (
                    <MenuItem key={account.id} value={account.id}>
                        {account.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="To Account"
                variant="outlined"
                select
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                error={!!errors.toAccount}
                helperText={errors.toAccount}
                fullWidth
                name="toAccount"
            >
                {accounts.map(account => (
                    <MenuItem key={account.id} value={account.id}>
                        {account.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Amount"
                variant="outlined"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                error={!!errors.amount}
                helperText={errors.amount}
                fullWidth
                name="amount"
            />
            <Button type="submit" variant="contained" color="primary">
                Transfer
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={Object.values(errors).some(x => x) ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TransferForm;
