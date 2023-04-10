import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import App from './App';
//import jwt from 'jsonwebtoken';


function getToken() {
  return localStorage.getItem('token');
}

function authenticateUser() {
  const token = getToken();
  if (token) {
    const decodedToken = (token);
    return decodedToken.exp > Date.now() / 1000;
  } else {
    return false;
  }
}

function SignIn() {
  const [authenticated, setAuthenticated] = React.useState(authenticateUser());

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post('http://192.168.201.180:5000/api/login', {
      username: data.get('email'),
      password: data.get('password')
    })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      setAuthenticated(true);
    })
    .catch(error => {
      console.error(error);
    });
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setAuthenticated(false);
  }

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <h1>VIVAFresh Cmimet</h1>
          {authenticated ? (
           <App />
          ) : (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Emri Userit"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Passwordi"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign in
              </Button>
            </Box>
          )}
        </Box>
      </Container>
   
  );
}
export default SignIn;