import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText, Collapse, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TimelineIcon from '@mui/icons-material/Timeline';

import { useStore } from '@nanostores/react';
import { accountsStore } from '../contexts/GlobalState';
import bankIcon from '../assets/bank-icon-blue.png'; // Make sure this path is correct
import TransferForm from '../components/TransferForm'; // Make sure this path is correct

const Transactions = () => {
    const { transfers, accounts } = useStore(accountsStore);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [showMoreTransactions, setShowMoreTransactions] = useState(false);
    const [transferDialogOpen, setTransferDialogOpen] = useState(false);

    // TODO: Complete this function to handle account selection
    const handleAccountSelect = (accountId) => {
        // Implement the functionality to select the account here
        // 1. Update the 'selectedAccountId' state with the selected account's ID.
        setSelectedAccountId(accountId);
        // 2. Reset the 'showMoreTransactions' state to 'false' when changing accounts.
        setShowMoreTransactions(false);
    };

    // TODO: Make sure 'filteredTransactions' is correctly filtered according to 'selectedAccountId'
    // Here we are extracting 'transfers' from the store and filtering based on 'selectedAccountId'
    const filteredTransactions = transfers.filter(
        (transfer) => transfer.fromAccountId === selectedAccountId || transfer.toAccountId === selectedAccountId
    );

    // TODO: Complete this function to get the account name by its ID
    const getAccountNameById = (accountId) => {
        // Implement the functionality to get the account name here
        // 1. Search for the account in the accounts array by the provided ID.
        const account = accounts.find((acc) => acc.id === accountId);
        // 2. Return the account name or 'Unknown Account' if not found.
        return account?.name || 'Unknown Account';
    };

    const handleTransferDialogOpen = () => {
        setTransferDialogOpen(true);
    };

    const handleTransferDialogClose = () => {
        setTransferDialogOpen(false);
    };

    return (
        <Container sx={{ mt: 10, mb: 4 }}>
            <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
                <img src={bankIcon} alt="BankApp" style={{ height: '40px', marginRight: '10px' }} />
                <Typography variant="h4" component="div">
                    Transactions
                </Typography>
                <Button variant="contained" color="primary" onClick={handleTransferDialogOpen}>
                    Make Transfer
                </Button>
            </Box>
            <Dialog open={transferDialogOpen} onClose={handleTransferDialogClose} maxWidth="md" fullWidth>
                <DialogTitle>Make Transfer</DialogTitle>
                <DialogContent>
                    <TransferForm onClose={handleTransferDialogClose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTransferDialogClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AccountBalanceIcon sx={{ mr: 1, color: '#007eae' }} />
                                Accounts
                            </Typography>
                            <List>
                                {/* TODO: Display the list of accounts using store.accounts */}
                                {/* Here we need to implement the mapping of accounts from the store */}
                                {accounts.map((account) => (
                                    <ListItem
                                        key={account.id}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => handleAccountSelect(account.id)}
                                        data-testid="movement-item"
                                    >
                                        <ListItemText
                                            primary={account.name}
                                            secondary={`Type: ${account.type}. Currency: ${account.currency}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <TimelineIcon sx={{ mr: 1, color: '#007eae' }} />
                                Transactions
                            </Typography>
                            {selectedAccountId && filteredTransactions.length === 0 && (
                                <Typography variant="body1" color="textSecondary">
                                    No transactions found for this account.
                                </Typography>
                            )}
                            <List>
                                {/* TODO: Display the first 2 transactions using filteredTransactions */}
                                {/* Here we need to implement the visualization of the first 2 transactions */}
                                {filteredTransactions.slice(0, 2).map((transfer, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={`From: ${getAccountNameById(transfer.fromAccountId)} - To: ${getAccountNameById(transfer.toAccountId)}`}
                                            secondary={`Amount: ${transfer.amount}. Date: ${transfer.date}`}
                                        />
                                    </ListItem>
                                ))}
                                <Collapse in={showMoreTransactions}>
                                    {/* TODO: Display additional transactions when 'showMoreTransactions' is true */}
                                    {/* Here we need to implement the visualization of additional transactions */}
                                    {filteredTransactions.slice(2).map((transfer, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={`From: ${getAccountNameById(transfer.fromAccountId)} - To: ${getAccountNameById(transfer.toAccountId)}`}
                                            secondary={`Amount: ${transfer.amount}. Date: ${transfer.date}`}
                                        />
                                    </ListItem>
                                ))}
                                </Collapse>
                                {/* TODO: Display the "Show More" button if there are more than 2 transactions */}
                                {/* Here we need to implement the logic to display the "Show More" button */}
                                { filteredTransactions.length > 2 && (
                                    <Button onClick={() => setShowMoreTransactions(true)}>Show more</Button>
                                )}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Transactions;
