import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DepositList = ({ deposits, onDelete }) => {
    return (
        <>
            <List>
                {deposits.map((deposit) => (
                    <ListItem
                        key={deposit.id}
                        sx={{ display: 'flex', justifyContent: 'space-between' }}
                        data-testid="deposit-item"
                    >
                        <ListItemText
                            primary={deposit.description}
                            secondary={`Amount: ${deposit.amount}, Interest Rate: ${deposit.interestRate}, Duration: ${deposit.duration}, Maturity Date: ${deposit.maturityDate}`}
                        />
                        <IconButton
                            edge="end"
                            onClick={(event) => onDelete(event, deposit.id)}
                            data-testid="delete-deposit-button"
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default DepositList;
