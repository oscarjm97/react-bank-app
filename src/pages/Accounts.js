import React, { useState } from 'react';
import {
    Container, Grid, Card, CardContent, Typography, Box, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, Button, Snackbar, Alert, Menu, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useStore } from '@nanostores/react';
import { accountsStore, addAccount, deleteAccount } from '../contexts/GlobalState';
import bankIcon from '../assets/bank-icon-blue.png';
import '../styles/Buttons.css'; // Import CSS file

const generateAccountNumber = () => {
    // Generate a random number between 0 and 1, multiply by 10^10 (to get 10 digits),
    // then floor it to remove the decimal part and convert it to a string.
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);

    return accountNumber.toString(); // Return it as a string to maintain leading zeros if any
};

const Accounts = () => {
    const accounts = useStore(accountsStore).accounts;
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [currency, setCurrency] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [formErrors, setFormErrors] = useState({});

    // TODO: Complete this function to handle opening the options menu
    const handleMenuOpen = (event, accountId) => {
        // Implement here
        setSelectedAccountId(accountId);
        setAnchorEl(event.currentTarget);
    };

    // TODO: Complete this function to handle closing the options menu
    const handleMenuClose = () => {
        // Implement here
        setAnchorEl(null);
    };

    // TODO: Complete this function to handle opening the add account dialog
    const handleDialogOpen = () => {
        // Implement here
        setOpen(true);
    };

    // TODO: Complete this function to handle closing the add account dialog
    const handleDialogClose = () => {
        // Implement here
        setOpen(false);
    };

    // TODO: Complete this function to add a new account
    const handleAddAccount = () => {
        // Implement here
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            const newAccount = {
                id: accounts.length + 1,
                name: description,
                balance: 0,
                accountNumber: generateAccountNumber(),
                type,
                currency,
            };

            addAccount(newAccount);
            setSnackbarMessage('Account added successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setOpen(false);
            setDescription('');
            setType('');
            setCurrency('');
        } else {
            setFormErrors(errors);
        }
    };

    // TODO: Complete this function to delete a selected account
    const handleDeleteAccount = () => {
        // Implement here
        deleteAccount(selectedAccountId);
        setSnackbarMessage('Account deleted successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setDeleteDialogOpen(false);
        setAnchorEl(null);
    };

    // TODO: Complete this function to handle opening the delete dialog
    const handleDeleteDialogOpen = () => {
        // Implement here
        setDeleteDialogOpen(true);
    };

    // TODO: Complete this function to handle closing the delete dialog
    const handleDeleteDialogClose = () => {
        // Implement here
        setDeleteDialogOpen(false);
        setAnchorEl(null);
    };

    // TODO: Complete this function to handle closing the snackbar
    const handleSnackbarClose = (event, reason) => {
        // Implement here
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    // TODO: Complete this function to validate the add account form
    const validateForm = () => {
        // Implement here
        const errors = {};

        if (!description) errors.description = 'Description is required';
        if (!type) errors.type = 'Type is required';
        if (!currency) errors.currency = 'Currency is required';

        return errors;
    };

    return (
        <Container sx={{ mt: 10, mb: 4 }}>
            <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
                <img src={bankIcon} alt="CaixaBank" style={{ height: '40px', marginRight: '10px' }} />
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" component="div">
                        Accounts
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Manage your bank accounts, including adding and deleting accounts.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    className="button-custom"
                    onClick={handleDialogOpen}
                    data-testid="add-account-button"
                >
                    Add Account
                </Button>
            </Box>
            <Grid container spacing={2}>
                {accounts.map((account) => (
                    <Grid item xs={12} sm={6} md={4} key={account.id}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <AccountBalanceIcon sx={{ mr: 1, color: '#007eae' }} />
                                        {account.name}
                                    </Typography>
                                    <IconButton
                                        edge="end"
                                        onClick={(event) => handleMenuOpen(event, account.id)}
                                        data-testid={`more-vert-icon-${account.id}`}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </Box>
                                <Typography variant="body2">Type: {account.type}</Typography>
                                <Typography variant="body2">Currency: {account.currency}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                data-testid="account-menu"
            >
                <MenuItem onClick={handleDeleteDialogOpen}>Delete Account</MenuItem>
            </Menu>

            <Dialog open={open} onClose={handleDialogClose} data-testid="add-account-dialog">
                <DialogTitle>Add New Account</DialogTitle>
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
                    <FormControl fullWidth sx={{ mt: 2 }} data-testid="type-select">
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            error={!!formErrors.type}
                            label="Type"
                        >
                            <MenuItem value="Checking">Checking</MenuItem>
                            <MenuItem value="Savings">Savings</MenuItem>
                            <MenuItem value="Business">Business</MenuItem>
                            <MenuItem value="Investment">Investment</MenuItem>
                        </Select>
                        {!!formErrors.type && <Typography color="error">{formErrors.type}</Typography>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }} data-testid="currency-select">
                        <InputLabel id="currency-label">Currency</InputLabel>
                        <Select
                            labelId="currency-label"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            error={!!formErrors.currency}
                            label="Currency"
                        >
                            <MenuItem value="EUR">EUR</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="GBP">GBP</MenuItem>
                            <MenuItem value="JPY">JPY</MenuItem>
                        </Select>
                        {!!formErrors.currency && <Typography color="error">{formErrors.currency}</Typography>}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} data-testid="cancel-add-button">Cancel</Button>
                    <Button onClick={handleAddAccount} data-testid="submit-button">Add</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} data-testid="delete-account-dialog">
                <DialogTitle>Delete Account</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this account?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} data-testid="cancel-delete-button">Cancel</Button>
                    <Button onClick={handleDeleteAccount} data-testid="delete-button">Delete</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Accounts;
