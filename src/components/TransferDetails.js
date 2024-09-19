// src/components/TransferDetails.js
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const TransferDetails = ({ transfer }) => {
    return (
        <Card sx={{ mt: 2, borderRadius: '12px', boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#007eae' }}>Transfer Details</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1"><strong>From:</strong> {transfer.fromAccount}</Typography>
                <Typography variant="body1"><strong>To:</strong> {transfer.toAccount}</Typography>
                <Typography variant="body1"><strong>Amount:</strong> {transfer.amount}</Typography>
                <Typography variant="body1"><strong>Date:</strong> {new Date(transfer.date).toLocaleString()}</Typography>
            </CardContent>
        </Card>
    );
};

export default TransferDetails;
