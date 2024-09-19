import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Box, Divider } from '@mui/material';
import { useStore } from '@nanostores/react';
import { accountsStore } from '../contexts/GlobalState';

// Helper function to format date as MM/DD/YYYY
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

const AccountDetails = ({ accountId }) => {
    // TODO: Implement data extraction from the store
    const accounts = useStore(accountsStore).accounts;
    const movements = useStore(accountsStore).movements;

    // TODO: Implement state for the account
    const [account, setAccount] = useState(null);

    // TODO: Implement state for the account's movements
    const [accountMovements, setAccountMovements] = useState(null);

    useEffect(() => {
        // TODO: Implement the logic to filter and update the selected account and its movements
        // 1. Filter the account that matches the provided `accountId`
        const selectedAccount = accounts.find((acc) => acc.id === accountId);
        // 2. Filter the movements associated with the selected account
        const accountMovements = movements.filter((mov) => mov.accountId === accountId);

        // 3. Update the state with the selected account and related movements
        setAccount(selectedAccount);
        setAccountMovements(accountMovements);
    }, [accountId, accounts, movements]); // Make sure to include the appropriate dependencies

    // TODO: Handle the case where the account is not found. It must be h6 and the message: "Account not found"
    if (!account) {
        return (
            <h6>Account not found</h6>
        );
    }

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Box sx={{ mb: 2 }}>
                <span>{account.name}</span>
                <span>{account.balance}</span>
                <span>{account.accountNumber}</span>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mt: 2 }}>Recent Transactions</Typography>
            <List>
                {/* Display recent movements of the account */}
                {accountMovements.map((movement) => (
                    <ListItem key={movement.id}>
                        <ListItemText
                           primary={movement.description}
                           secondary={`Amount: ${movement.amount}. Date: ${formatDate(movement.date)}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default AccountDetails;
