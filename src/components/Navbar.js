import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import caixabankIcon from '../assets/caixabank-icon.png';

const Navbar = ({ userName }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawer = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/accounts">
                    <ListItemText primary="Accounts" />
                </ListItem>
                <ListItem button component={Link} to="/movements">
                    <ListItemText primary="Movements" />
                </ListItem>
                <ListItem button component={Link} to="/transfers">
                    <ListItemText primary="Transfers" />
                </ListItem>
                <ListItem button component={Link} to="/deposits">
                    <ListItemText primary="Deposits" />
                </ListItem>
                <ListItem button component={Link} to="/brokers">
                    <ListItemText primary="Brokers" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <Box
                    component={Link} to="/"
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <Box
                        component="img"
                        sx={{
                            height: 40,
                            marginRight: 2,
                        }}
                        alt="CaixaBank logo"
                        src={caixabankIcon}
                    />
                </Box>
                <Typography variant="h6" sx={{ flexGrow: 1, fontStyle: 'italic' }}>
                    CaixaBankNow
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Button color="inherit" component={Link} to="/">Dashboard</Button>
                    <Button color="inherit" component={Link} to="/accounts">Accounts</Button>
                    <Button color="inherit" component={Link} to="/movements">Movements</Button>
                    <Button color="inherit" component={Link} to="/transfers">Transfers</Button>
                    <Button color="inherit" component={Link} to="/deposits">Deposits</Button>
                    <Button color="inherit" component={Link} to="/brokers">Brokers</Button>
                </Box>
                {/* <Typography variant="h6" sx={{ ml: 2, display: { xs: 'none', md: 'block' } }}>
                    {userName}
                </Typography> */}
                <Box 
                    sx={{ 
                        ml: 2, 
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: '#757575',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                    }}
                >
                    {userName[0]}
                </Box>

                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { xs: 'block', md: 'none' } }}
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
