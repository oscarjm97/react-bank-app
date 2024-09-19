import React from 'react';
import { CircularProgress, Typography, Paper, Link, Box } from '@mui/material';
import useFetch from '../hooks/useFetch';

// TODO: Implement the useFetch hook
// Make sure that useFetch handles loading state, data, and errors.

const BrokerDetails = ({ brokerId }) => {
    // TODO: Call the useFetch hook with the API URL to get broker details
    // Get data from: `https://n47wv61fpe.execute-api.eu-west-1.amazonaws.com/pro/brokers/details?id=`
    const { data, loading, error } = useFetch(`https://n47wv61fpe.execute-api.eu-west-1.amazonaws.com/pro/brokers/details?id=${brokerId}`);

    // Handle the loading state by showing a spinner
    if (loading) {
        return (
            <Paper sx={{ p: 2, mt: 3 }} data-testid="loading-container">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress data-testid="loading-spinner" />
                </Box>
            </Paper>
        );
    }

    // TODO: Handle the error state by showing an error message
    if (error) {
        return (
            <Paper sx={{ p: 2, mt: 3 }}>
                <Typography variant="body1" color="error" data-testid="error-message">Error loading the broker with id: {brokerId}</Typography>
            </Paper>
        );
    }

    // TODO: Display the broker details when the information has loaded
    /*
    Variables:
    Name: {data.nombre}
    Country: {data.pais}
    Address: {data.direccion}
    Phone: {data.telefono}
    Email: {data.email} -- Email must be a Link mailto
    License: {data.licencia}
    Active Since: {data.activo_desde}
    Website: {data.sitio_web} -- Website must be a Link
    */
    return (
        <Paper sx={{ p: 2, mt: 3 }} data-testid="broker-details-container">
            <Typography variant="h6" gutterBottom>
                Broker Details
                <br />
                Name: {data.nombre}
                <br />
                Country: {data.pais}
                <br />
                Address: {data.direccion}
                <br />
                Phone: {data.telefono}
                <br />
                <Link href={`mailto:${data.email}`} underline="hover">
                    Email: {data.email}
                </Link>
                <br />
                License: {data.licencia}
                <br />
                Active Since: {data.activo_desde}
                <br />
                <Link href={data.sitio_web} rel="noopener" underline="hover">
                    Website: {data.sitio_web}
                </Link>
            </Typography>
        </Paper>
    );
};

export default BrokerDetails;
