import React,{useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Box } from '@mui/system';
import './Album.css';



export default function Album() {

 
 


const theme = createTheme();
    useEffect(() => {
        const token =localStorage.getItem('token')
        fetch("http://localhost:3333/authen", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
              "Authorization" : 'Bearer '+token
            },
           
          })
            .then((response) => response.json())
            .then( data => {
              if(data.status === 'ok'){
                // alert('authen  sucess')
                localStorage.setItem('token',data.token)
              }
              else{
                  alert('authen failed')
                  localStorage.removeItem('token')
                  window.location = '/login'
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });

    }, [])

    const handlelogout =(event) =>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location = '/login'
    }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
     
        {/* Hero unit */}
       
          <Container fixed>
            
              <Button variant="contained" onClick={handlelogout}>logout</Button>

              
                 <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} >
                      <Grid item xs={4}>
                        
                        <div class='card s1'>
                        <div class='info'>
                          <h1 class='title'>Title</h1>
                            <p class='description'>Lorem ipsum dolor sit amet, 
                                      consectetur adipisicing elit. Eius esse corporis, 
                                      velit porro impedit laudantium accusamus! Id velit, 
                                      velit, i.</p>
                            </div>
                    </div>
                        
                      </Grid>
                      <Grid item xs={4}>
                        
                        <div class='card'>
                        <div class='info'>
                          <h1 class='title'>Title</h1>
                            <p class='description'>Lorem ipsum dolor sit amet, 
                                      consectetur adipisicing elit. Eius esse corporis, 
                                      velit porro impedit laudantium accusamus! Id velit, 
                                      velit, i.</p>
                            </div>
                    </div>
                        
                      </Grid>
                      <Grid item xs={4}>
                        
                        <div class='card' >
                        <div class='info'>
                          <h1 class='title'>Title</h1>
                            <p class='description'>Lorem ipsum dolor sit amet, 
                                      consectetur adipisicing elit. Eius esse corporis, 
                                      velit porro impedit laudantium accusamus! Id velit, 
                                      velit, i.</p>
                            </div>
                    </div>
                       
                      </Grid>
                      <Grid item xs={4}>
                        
                        <div class='card'>
                            <div class='info'>
                              <h1 class='title'>Title</h1>
                                <p class='description'>Lorem ipsum dolor sit amet, 
                                          consectetur adipisicing elit. Eius esse corporis, 
                                          velit porro impedit laudantium accusamus! Id velit, 
                                          velit, i.</p>
                                </div>
                          </div>
                        
                      </Grid>
                      <Grid item xs={4}>
                        
                        <div class='card'>
                            <div class='info'>
                              <h1 class='title'>Title</h1>
                                <p class='description'>Lorem ipsum dolor sit amet, 
                                          consectetur adipisicing elit. Eius esse corporis, 
                                          velit porro impedit laudantium accusamus! Id velit, 
                                          velit, i.</p>
                                </div>
                            </div>
                        
                      </Grid>
                      <Grid item xs={4}>
                       
                        <div class='card'>
                            <div class='info'>
                              <h1 class='title'>Title</h1>
                                <p class='description'>Lorem ipsum dolor sit amet, 
                                          consectetur adipisicing elit. Eius esse corporis, 
                                          velit porro impedit laudantium accusamus! Id velit, 
                                          velit, i.</p>
                                </div>
                            </div>
                        
                      </Grid>
                      <Grid item xs={4}>
                        
                        <div class='card'>
                            <div class='info'>
                              <h1 class='title'>Title</h1>
                                <p class='description'>Lorem ipsum dolor sit amet, 
                                          consectetur adipisicing elit. Eius esse corporis, 
                                          velit porro impedit laudantium accusamus! Id velit, 
                                          velit, i.</p>
                                </div>
                            </div>
                        
                      </Grid>
                      <Grid item xs={4}>
                      
                        <div class='card'>
                            <div class='info'>
                              <h1 class='title'>Title</h1>
                                <p class='description'>Lorem ipsum dolor sit amet, 
                                          consectetur adipisicing elit. Eius esse corporis, 
                                          velit porro impedit laudantium accusamus! Id velit, 
                                          velit, i.</p>
                                </div>
                            </div>
                      
                      </Grid>
                      <Grid item xs={4}>
                      
                        <div class='card'>
                            <div class='info'>
                              <h1 class='title'>Title</h1>
                                <p class='description'>Lorem ipsum dolor sit amet, 
                                          consectetur adipisicing elit. Eius esse corporis, 
                                          velit porro impedit laudantium accusamus! Id velit, 
                                          velit, i.</p>
                                </div>
                            </div>
                       
                      </Grid>
                      <Grid item xs={4}>
                        
                        <div class='card'>
                            <div class='info'>
                              <h1 class='title'>Title</h1>
                                <p class='description'>Lorem ipsum dolor sit amet, 
                                          consectetur adipisicing elit. Eius esse corporis, 
                                          velit porro impedit laudantium accusamus! Id velit, 
                                          velit, i.</p>
                                </div>
                            </div>
                        
                      </Grid>
                      <Grid item xs={4}>
                       
                        <div class='card'>
                            <div class='info'>
                              <h1 class='title'>Title</h1>
                                <p class='description'>Lorem ipsum dolor sit amet, 
                                          consectetur adipisicing elit. Eius esse corporis, 
                                          velit porro impedit laudantium accusamus! Id velit, 
                                          velit, i.</p>
                                </div>
                            </div>
                        
                      </Grid>
                      
                    </Grid>
                  </Box>
                </Container>
       
       
      {/* End footer */}
    </ThemeProvider>
  );
}