import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import "./Pay.css"

export default function Pay() {
    const handlelogout2 =(event) =>{
        event.preventDefault();
        window.location ='/coffee'
    }
  return (
    <div>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            PAYMENT
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    
                    <div class="article-cardpayinfo">
                        <center>
                            <h1 className='title'>
                                Order details
                            </h1>
                        </center>
                        <p className='description'>
                            
                        </p>
                    </div>
                        
                </Grid>
                <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                                <button class="article-cardpay"></button>
                                <button class="article-cardpay"></button>
                        </Stack>
                        
                </Grid>
                <Grid item xs={8}>
                    <Stack spacing={2} direction="row">
                        <button className='button-17' style={{backgroundColor:"green" ,color:"white"}}> Add +</button>
                        <button className='button-17' onClick={handlelogout2}>Back</button>
                    </Stack>

                    
                </Grid>
            </Grid>
            
           
            
          </Box>
        </Box>
        </Container>
    </div>
  )
}
