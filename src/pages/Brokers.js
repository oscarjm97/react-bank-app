import React, { useState } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import caixabankIcon from '../assets/caixabank-icon-blue.png';
import BrokerList from '../components/BrokerList';
import BrokerDetails from '../components/BrokerDetails';

const Brokers = () => {
    const [selectedBrokerId, setSelectedBrokerId] = useState(null);

    return (
        <Container sx={{ mt: 10, mb: 4 }}>
            <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
                <img src={caixabankIcon} alt="CaixaBank" style={{ height: '40px', marginRight: '10px' }} />
                <Typography variant="h4" component="div">
                    Brokers
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <BrokerList onSelectBroker={setSelectedBrokerId} />
                </Grid>
                <Grid item xs={12} md={6}>
                    {selectedBrokerId ? <BrokerDetails brokerId={selectedBrokerId} /> : (
                        <Typography variant="body1" sx={{ mt: 3 }}>
                            Select a broker to see the details
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Brokers;
