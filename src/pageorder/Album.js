import React,{useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/system/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import './Album.css';
import ButtonAppBar from '../Appbar';
// import useAuthentication from '../UseAuthentication';



export default function Album() {

  const theme = createTheme();
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {ButtonAppBar()}
      </div>
      <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Container component="main" maxWidth="xl">
                 <Box sx={{ flexGrow: 0.5 }}> 
                    <Grid container spacing={4} >
                      <Grid item xs={4} >
                          <Typography variant="h1" component="h2">
                              MENU
                          </Typography>
                        <br/>
                        <div >
                                  <div class="article-card">
                                      {/* promotion */}
                                  </div>
                                </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div class='card s1'>
                            <div class='info'>
                              <h2 class='title'>
                                Coffee
                              </h2>
                                <p class='description'>
                                A latte or caffè latte is a milk coffee that is a made up of one or two shots of espresso, 
                                lots of steamed milk and a final, thin layer of frothed milk on top.
                                </p>
                              <Container fixed>
                                <Grid container spacing={1} >
                                  <Grid item xs={10}> 
                                      <Stack spacing={1} direction="row">
                                          <Button  variant="contained" 
                                            color="success" href="/Coffee" >
                                            Buy</Button>
                                      </Stack>
                                  </Grid>
                                </Grid>
                              </Container>
                                </div>
                          </div>
                        
                      </Grid>
                      <Grid item xs={4}>
                        <div class='card s2'>
                          <div class='info'>
                              <h1 class='title'>
                              Tea
                              </h1>
                                  <p class='description'>
                                    Lorem ipsum dolor sit amet, 
                                    consectetur adipisicing elit. Eius esse corporis, 
                                    velit porro impedit laudantium accusamus! Id velit, 
                                    velit, i.
                                    </p>
                              </div>
                    </div>
                        
                      </Grid>
                      <Grid item xs={4}>
                        
                        <div class='card s3' >
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
                        
                        <div class='card s3'>
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
                        
                        <div class='card s3'>
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
                       
                        <div class='card s3'>
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
                  <br/>
                </Container>
       </Box>
       
      {/* End footer */}
    </ThemeProvider>
  );
}