import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Menu, MenuItem, Snackbar, Alert } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import { useStore } from '@nanostores/react';
import { accountsStore, addDeposit, deleteDeposit } from '../contexts/GlobalState';
import bankIcon from '../assets/bank-icon-blue.png';
import DepositList from '../components/DepositList';

const Deposits = () => {
    const { deposits } = useStore(accountsStore);
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [duration, setDuration] = useState('');
    const [maturityDate, setMaturityDate] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDepositId, setSelectedDepositId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [formErrors, setFormErrors] = useState({});

    // TODO: Implement the functionality to open the deposit actions menu
    const handleMenuOpen = (event, depositId) => {
        setSelectedDepositId(depositId);
        setAnchorEl(event.currentTarget);
    };

    // TODO: Implement the functionality to close the deposit actions menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // TODO: Implement the functionality to open the add deposit dialog
    const handleDialogOpen = () => {
        setOpen(true);
    };

    // TODO: Implement the functionality to close the add deposit dialog
    const handleDialogClose = () => {
        setOpen(false);
    };

    // TODO: Implement the functionality to add a new deposit
    const handleAddDeposit = () => {
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            addDeposit({ id: deposits.length + 1, description, amount, interestRate, duration, maturityDate });
            setSnackbarMessage('Deposit added successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setOpen(false);
            setDescription('');
            setAmount('');
            setInterestRate('');
            setDuration('');
            setMaturityDate('');
        } else {
            setFormErrors(errors);
        }
    };

    // TODO: Implement the functionality to delete a deposit
    const handleDeleteDeposit = () => {
        deleteDeposit(selectedDepositId);
        setSnackbarMessage('Deposit deleted successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setDeleteDialogOpen(false);
        setAnchorEl(null);
    };

    // TODO: Implement the functionality to open the deposit deletion confirmation dialog
    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    // TODO: Implement the functionality to close the deposit deletion confirmation dialog
    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setAnchorEl(null);
    };

    // TODO: Implement the functionality to close the snackbar
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    // TODO: Implement the validation of the add deposit form
    const validateForm = () => {
        const errors = {};

        if (!description) errors.description = 'Description is required';
        if (!amount || isNaN(amount) || amount <= 0) errors.amount = 'Valid amount is required';
        if (!interestRate || isNaN(interestRate) || interestRate <= 0) errors.interestRate = 'Valid interest rate is required';
        if (!duration) errors.duration = 'Duration is required';
        if (!maturityDate) errors.maturityDate = 'Maturity date is required';

        return errors;
    };

    return (
        <Container sx={{ mt: 10, mb: 4 }}>
            <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
                <img src={bankIcon} alt="BankApp" style={{ height: '40px', marginRight: '10px' }} />
                <Typography variant="h4" component="div">
                    Deposits
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <SavingsIcon sx={{ mr: 1, color: '#007eae' }} />
                                    Deposits
                                </Typography>
                                <Button variant="contained" color="primary" onClick={handleDialogOpen} data-testid="add-deposit-button">
                                    Add Deposit
                                </Button>
                            </Box>
                            {/* TODO: Render the list of deposits */}
                            <DepositList deposits={deposits} onDelete={handleMenuOpen} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/* TODO: Implement the deposit actions menu */}
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                data-testid="deposit-menu"
            >
                <MenuItem onClick={handleDeleteDialogOpen} data-testid="delete-deposit-menu-item">Delete Deposit</MenuItem>
            </Menu>
            {/* TODO: Implement the dialog for adding a deposit. data-testid="add-deposit-dialog" */}
            {/* Handle close dialog. Dialog Title: Add New Deposit */}
            <Dialog open={open} onClose={handleDialogClose} data-testid="add-deposit-dialog">
                <DialogTitle>Add New Deposit</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        error={!!formErrors.description}
                        helperText={formErrors.description}
                        data-testid="description-input"
                    />
                    <TextField
                        margin="dense"
                        label="Amount"
                        type="number"
                        fullWidth
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        error={!!formErrors.amount}
                        helperText={formErrors.amount}
                        data-testid="amount-input"
                    />
                    <TextField
                        margin="dense"
                        label="Interest Rate"
                        type="number"
                        fullWidth
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        error={!!formErrors.interestRate}
                        helperText={formErrors.interestRate}
                        data-testid="interest-rate-input"
                    />
                    <TextField
                        margin="dense"
                        label="Duration"
                        type="text"
                        fullWidth
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        error={!!formErrors.duration}
                        helperText={formErrors.duration}
                        data-testid="duration-input"
                    />
                    <TextField
                        margin="dense"
                        label="Maturity Date"
                        type="date"
                        fullWidth
                        value={maturityDate}
                        onChange={(e) => setMaturityDate(e.target.value)}
                        error={!!formErrors.maturityDate}
                        helperText={formErrors.maturityDate}
                        data-testid="maturity-date-input"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleAddDeposit} data-testid="submit-add-deposit-button">Add</Button>
                </DialogActions>
            </Dialog>
            {/* TODO: Implement the dialog for deleting a deposit. data-testid="delete-deposit-dialog" */}
            {/* Handle close dialog. Dialog Title: Delete Deposit */}
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} data-testid="delete-deposit-dialog">
                <DialogTitle>Delete Deposit</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this deposit?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                    <Button onClick={handleDeleteDeposit} data-testid="confirm-delete-deposit-button">Delete</Button>
                </DialogActions>
            </Dialog>
            {/* Snackbar for showing success or error messages */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} data-testid="snackbar">
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Deposits;
