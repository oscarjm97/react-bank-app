import React from 'react';
import { CircularProgress, List, ListItem, ListItemText, Paper, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import useFetch from '../hooks/useFetch';

// TODO: Implement the useFetch hook
// Make sure that useFetch handles loading state, data, and errors.

const BrokerList = ({ onSelectBroker }) => {
    // TODO: Implement the useFetch hook in ../hooks/useFetch
    // The hook should return an object with 'data', 'loading', and 'error' properties.
    // Get data from: 'https://n47wv61fpe.execute-api.eu-west-1.amazonaws.com/pro/brokers'
    const { data, loading, error } = useFetch('https://n47wv61fpe.execute-api.eu-west-1.amazonaws.com/pro/brokers');

    // TODO: Handle the loading state by showing a spinner - data-testid="loading-spinner"
    if (loading) {
        return (
            <Paper sx={{ p: 2, mt: 3, display: 'flex', justifyContent: 'center' }} data-testid="loading-container">
                <CircularProgress data-testid="loading-spinner" />
            </Paper>
        );
    }

    // TODO: Handle the error state by showing an error message -- data-testid="error-message"
    if (error) {
        return (
            <Paper sx={{ p: 2, mt: 3 }}>
                <Typography variant="h6" data-testid="error-message">Error loading brokers</Typography>
            </Paper>
        );
    }

    // TODO: Handle broker selection by calling onSelectBroker with the broker's ID
    const handleSelectBroker = (brokerId) => {
        // Implement the functionality to select the broker
        onSelectBroker(brokerId);
    };

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BusinessCenterIcon sx={{ mr: 1, color: '#007eae' }} />
                Broker List
            </Typography>
            <List>
                {/* Map brokers from 'data' to list items */}
                {data.map((broker) => (
                    <ListItem
                        key={broker.id}
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleSelectBroker(broker.id)}
                        data-testid="broker-item"
                    >
                        <ListItemText
                            primary={broker.nombre}
                            secondary={broker.pais}
                        />
                        <IconButton edge="end" aria-label="view">
                            <VisibilityIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default BrokerList;
