import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText, IconButton, Collapse, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useStore } from '@nanostores/react';
import { Link } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SavingsIcon from '@mui/icons-material/Savings';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TimelineIcon from '@mui/icons-material/Timeline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { accountsStore, addDeposit, deleteDeposit } from '../contexts/GlobalState';
import DepositList from '../components/DepositList';
import AccountDetails from '../components/AccountDetails';
import '../styles/Buttons.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = ({ userName }) => {
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [showMoreTransactions, setShowMoreTransactions] = useState(false);
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [duration, setDuration] = useState('');
    const [maturityDate, setMaturityDate] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedDepositId, setSelectedDepositId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [formErrors, setFormErrors] = useState({});

    const { accounts, transfers, deposits } = useStore(accountsStore);

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Account Balance',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const barData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Transactions',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

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

    const handleDeleteDeposit = () => {
        deleteDeposit(selectedDepositId);
        setSnackbarMessage('Deposit deleted successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setDeleteDialogOpen(false);
    };

    const handleDeleteDialogOpen = (event, id) => {
        setSelectedDepositId(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

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
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="div">
                    Welcome, {userName}
                </Typography>
            </Box>
            <Box sx={{ mt: 8 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={2}>
                        <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountBalanceIcon fontSize="medium" color="primary" />
                                <Typography variant="h7" sx={{ ml: 2 }}>Accounts</Typography>
                            </Box>
                            <IconButton component={Link} to="/accounts">
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TimelineIcon fontSize="medium" color="primary" />
                                <Typography variant="h7" sx={{ ml: 2 }}>Movements</Typography>
                            </Box>
                            <IconButton component={Link} to="/movements">
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <SwapHorizIcon fontSize="medium" color="primary" />
                                <Typography variant="h7" sx={{ ml: 2 }}>Transfers</Typography>
                            </Box>
                            <IconButton component={Link} to="/transfers">
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <BusinessCenterIcon fontSize="large" color="primary" />
                                <Typography variant="h7" sx={{ ml: 2 }}>Brokers</Typography>
                            </Box>
                            <IconButton component={Link} to="/brokers">
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <SavingsIcon fontSize="large" color="primary" />
                                <Typography variant="h7" sx={{ ml: 2 }}>Deposits</Typography>
                            </Box>
                            <IconButton component={Link} to="/deposits">
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <List dense>
                                    {accounts.map((account) => (
                                        <div key={account.id}>
                                            <ListItem button onClick={() => setSelectedAccountId(selectedAccountId === account.id ? null : account.id)}>
                                                <ListItemText
                                                    primary={account.name}
                                                    secondary={`Balance: ${account.balance}`}
                                                />
                                                <IconButton>
                                                    <ArrowForwardIosIcon />
                                                </IconButton>
                                            </ListItem>
                                            <Collapse in={selectedAccountId === account.id} timeout="auto" unmountOnExit>
                                                <AccountDetails accountId={account.id} />
                                            </Collapse>
                                        </div>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <SwapHorizIcon sx={{ mr: 1, color: '#007eae' }} />
                                    Recent Transactions
                                </Typography>
                                <List dense>
                                    {transfers.slice(0, 2).map((transfer, index) => (
                                        <ListItem key={index}>
                                            <ListItemText
                                                primary={`From: ${transfer.fromAccount} To: ${transfer.toAccount} Amount: ${transfer.amount}`}
                                                secondary={`Date: ${new Date(transfer.date).toLocaleString()}`}
                                            />
                                        </ListItem>
                                    ))}
                                    <Collapse in={showMoreTransactions}>
                                        {transfers.slice(2).map((transfer, index) => (
                                            <ListItem key={index}>
                                                <ListItemText
                                                    primary={`From: ${transfer.fromAccount} To: ${transfer.toAccount} Amount: ${transfer.amount}`}
                                                    secondary={`Date: ${new Date(transfer.date).toLocaleString()}`}
                                                />
                                            </ListItem>
                                        ))}
                                    </Collapse>
                                    {transfers.length > 2 && (
                                        <Button onClick={() => setShowMoreTransactions(!showMoreTransactions)}>
                                            {showMoreTransactions ? 'Show Less' : 'Show More'}
                                        </Button>
                                    )}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <AccountBalanceIcon sx={{ mr: 1, color: '#007eae' }} />
                                    Account Overview
                                </Typography>
                                <Line data={lineData} options={options} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <SwapHorizIcon sx={{ mr: 1, color: '#007eae' }} />
                                    Transactions Overview
                                </Typography>
                                <Bar data={barData} options={options} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <SavingsIcon sx={{ mr: 1, color: '#007eae' }} />
                                        Deposits
                                    </Typography>
                                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                                        Add Deposit
                                    </Button>
                                </Box>
                                <DepositList deposits={deposits} onDelete={handleDeleteDialogOpen} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddDeposit}>Add</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>Delete Deposit</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this deposit?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                    <Button onClick={handleDeleteDeposit}>Delete</Button>
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

export default Dashboard;
