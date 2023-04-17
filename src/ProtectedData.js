import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

function ProtectedData(x) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found');
      return;
    }

    fetch('http://localhost:3333/protected', {
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error retrieving protected data');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        console.log(data)
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return (
            <div >
                
                <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
        Please login before using the system.
        </Typography>
        {/* <Typography variant="h5" component="h2" gutterBottom>
          {'Pin a footer to the bottom of the viewport.'}
          {'The footer will move as the main element of the page grows.'}
        </Typography> */}
        <Typography variant="body1">Please login before using the system.{error}</Typography>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            My sticky footer can be found here.
          </Typography>
          
        </Container>
      </Box>
    </Box>
            </div>
            ) 
  }

  if (!data) {
    return(<div>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
          </div>) 
  }

  return <div>
            {x}
    </div>;
}

export default ProtectedData;
