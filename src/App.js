import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, Typography, Box, Paper, TextField, Button } from '@mui/material';
import Navbar from './components/Navbar';
import AppRoutes from './routes'; // Este archivo deberá definir las rutas de la app
import theme from './theme';
import './index.css';

function App() {
  const [name, setName] = useState('');
  const [inputName, setInputName] = useState('');
  const [error, setError] = useState('');

  const handleNameSubmit = () => {
    if (inputName.trim()) {
      setName(inputName);
    } else {
      setError('Name is required');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleNameSubmit();
    }
  };

  if (!name) {
    return (
      <ThemeProvider theme={theme}>
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh" bgcolor="#f4f4f4">
          <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom color="#007eae">
              Welcome to CaixaBankNow
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Please enter your name to continue.
            </Typography>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                if (e.target.value.trim()) {
                  setError('');
                }
              }}
              onKeyPress={handleKeyPress}
              sx={{ mb: 2 }}
              error={!!error}
              helperText={error}
              InputProps={{
                disableUnderline: true,
              }}
              style={{ backgroundColor: '#fff' }}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: '#007eae', '&:hover': { backgroundColor: '#006b98' } }}
              onClick={handleNameSubmit}
              fullWidth
            >
              Continue
            </Button>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar userName={name} />
        <div className="content">
          <AppRoutes name={name} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
