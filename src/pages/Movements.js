import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText, Collapse, Button, Box } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TimelineIcon from '@mui/icons-material/Timeline';

import { useStore } from '@nanostores/react';
import { accountsStore } from '../contexts/GlobalState';
import caixabankIcon from '../assets/caixabank-icon-blue.png'; // Make sure this path is correct

const Movements = () => {
    const store = useStore(accountsStore);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [showMoreMovements, setShowMoreMovements] = useState(false);

    // TODO: Complete this function to handle account selection
    const handleAccountSelect = (accountId) => {
        // Implement the functionality to select the account here
        // 1. Update the 'selectedAccountId' state with the selected account's ID.
        setSelectedAccountId(accountId);
        // 2. Reset the 'showMoreMovements' state to 'false' when changing accounts.
        setShowMoreMovements(false);
    };

    // TODO: Make sure 'movements' is correctly filtered according to 'selectedAccountId'
    // Here we are extracting 'movements' from the store and filtering based on 'selectedAccountId'
    const filteredMovements = store.movements.filter((mov) => mov.accountId === selectedAccountId);

    return (
        <Container sx={{ mt: 10, mb: 4 }}>
            <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
                <img src={caixabankIcon} alt="CaixaBank" style={{ height: '40px', marginRight: '10px' }} />
                <Typography variant="h4" component="div">
                    Movements
                </Typography>
            </Box>
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
                                {store.accounts.map((account) => (
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
                                Movements
                            </Typography>
                            {selectedAccountId && filteredMovements.length === 0 && (
                                <Typography variant="body1" color="textSecondary">
                                    No movements found for this account.
                                </Typography>
                            )}
                            <List>
                                {/* TODO: Display the first 2 movements using filteredMovements */}
                                {/* Here we need to implement the visualization of the first 2 movements */}
                                {filteredMovements.slice(0, 2).map((movement) => (
                                    <ListItem key={movement.id}>
                                        <ListItemText
                                            primary={movement.description}
                                            secondary={`Amount: ${movement.amount}. Date: ${movement.date}`}
                                        />
                                    </ListItem>
                                ))}
                                <Collapse in={showMoreMovements}>
                                    {/* TODO: Display additional movements when 'showMoreMovements' is true */}
                                    {/* Here we need to implement the visualization of additional movements */}
                                    {filteredMovements.slice(2).map((movement) => (
                                        <ListItem key={movement.id}>
                                            <ListItemText
                                                primary={movement.description}
                                                secondary={`Amount: ${movement.amount}. Date: ${movement.date}`}
                                            />
                                        </ListItem>
                                    ))}
                                </Collapse>
                                {/* TODO: Display the "Show More" button if there are more than 2 movements */}
                                {/* Here we need to implement the logic to display the "Show More" button */}
                                { filteredMovements.length > 2 && (
                                    <Button onClick={() => setShowMoreMovements(true)}>Show more</Button>
                                )}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Movements;
