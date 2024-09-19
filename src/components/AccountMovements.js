import React, { useMemo, useCallback } from 'react';
import { List, ListItem, ListItemText, Paper, Typography, CircularProgress } from '@mui/material';
import useAccountData from '../hooks/useAccountData';

const AccountMovements = React.memo(({ accountId }) => {
    // TODO: Implement the useAccountData hook to get 'accountMovements', 'accountTransfers', 'loading', and 'error'
    const { accountMovements, accountTransfers, loading, error } = useAccountData(accountId);

    // TODO: Implement a formatDate function that takes a date
    // converts it to a Date object and formats it in the format YYYYY-MM-DD.
    // Use useCallback to store this function, ensuring that it is not recreated on each rendering of the component.
    const formatDate = useCallback(dateString => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1; // Months are zero-based
        const day = date.getDate();
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }, []);

    // TODO: Implement a memoized version of a list rendering function.
    // Use useMemo to generate a list of ListItem components based on the accountMovements array.
    // Ensure the memoized function only recomputes when accountMovements or the formatDate function changes.
    const movementItems = useMemo(() => {
        // Iterate over accountMovements
        return accountMovements.map((movement) => (
            <ListItem key={movement.id}>
                <ListItemText
                    primary={movement.description}
                    secondary={`Amount: ${movement.amount}. Date: ${formatDate(movement.date)}`}
                />
            </ListItem>
        ));
    }, [accountMovements, formatDate]);

    // TODO: Memorize the list items for transfers using useMemo
    const transferItems = useMemo(() => {
        // Iterate over accountTransfers
        return accountTransfers.map((transfer) => (
            <ListItem key={transfer.id}>
                <ListItemText
                    primary={`From: ${transfer.fromAccount} To: ${transfer.toAccount} Amount: ${transfer.amount}`}
                    secondary={`Date: ${formatDate(transfer.date)}`}
                />
            </ListItem>
        ));
    }, [accountTransfers, formatDate]);

    // Handle the loading state by showing a spinner
    if (loading) {
        return (
            <Paper sx={{ p: 2, mt: 3, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Paper>
        );
    }

    // Handle the error state by showing an error message
    if (error) {
        return (
            <Paper sx={{ p: 2, mt: 3 }}>
                <Typography variant="h6">Error loading movements</Typography>
            </Paper>
        );
    }

    // Handle the case where there are no movements or transfers
    if (accountMovements.length === 0 && accountTransfers.length === 0) {
        return (
            <Paper sx={{ p: 2, mt: 3 }}>
                <Typography variant="h6">No movements found</Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6">Movements</Typography>
            <List>
                {movementItems}
            </List>
            <Typography variant="h6" sx={{ mt: 3 }}>Transfers</Typography>
            <List>
                {transferItems}
            </List>
        </Paper>
    );
});

export default AccountMovements;
