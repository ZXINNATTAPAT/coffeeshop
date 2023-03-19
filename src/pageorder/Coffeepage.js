import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// import Stack from '@mui/system/Stack';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Stack from '@mui/system/Stack';
import './Album.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';



export default function ASX() {
  const [datas, setData] = useState([]);
  const theme = createTheme();
 
//############### for passing order to db : bid ################
  // const passingorder = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const jsonData ={
  //       // Tel: data.get('Tel'),
  //       // id_receipt: data.get('id_receipt'),
  //       product_id: data.get('product_id'),
  //       price: data.get('price'),
  //       // amount :data.get('amount'),
  //       // sweets :data.get('sweets')
  // }
  // fetch("http://localhost:3333/bid", {
  //   method: "POST", // or 'PUT'
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(jsonData),
  // })
  //   .then((response) => response.json())
  //   .then( data => {
  //     if(data.status === 'ok'){
  //         alert('passing sucess')
  //     }
  //     else{
  //         alert('passing failed')
  //     }
  //     console.log("Success:", jsonData);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
  // };
//########### Button back page ####################
const handlelogoutback =(event) =>{
    event.preventDefault();
    window.location ='/Album'
}
//########### Button back page ####################
const pickup =(event) =>{
    event.preventDefault();
    window.location ='/Typepage'
}
//#############this function for use axios GET !!!!!!!!!##############
  const fetchData = async () => {
              const res = await axios('http://localhost:3333/manu/pick');
              setData(res.data.results)
            };
useEffect(() => {
            fetchData();
        },[] );//This have []
console.log(datas)
          
  return (
    <> 
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
     
        {/* <span>{JSON.stringify(datas)}</span> */}
        <Box
          sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          }}>
        <Container component="main" maxWidth="xl">
          <Box sx={{ flexGrow: 0.5 }}>
            <Grid container spacing={4} >
                 <Grid item xs={4} >
                   <Typography variant="h1" component="h2"> COFFEE</Typography>
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                           spacing={{ xs: 1, sm: 2, md: 4 }}
                          >
                          <button className='button-17' style={{
                             backgroundColor:"green" ,color:"white"}}>
                            Home </button>
                          <button className='button-17' >Profile </button>
                          <button className='button-17' >logout </button>
                          <button className='button-17' onClick={handlelogoutback}>Back </button>
                          </Stack><br/>
                          <div >
                          <div class="article-card">
                           {/* promotion */}
                          </div>
                        </div>
                    </Grid>
        {datas.map(employe => {
          return (
                <Grid item xs={4} >
                  <div key={employe.id}>
                      <div className={employe.npng}>
                       <div class='info'>
                          <h2 class='title'>{employe.name}</h2>
                            <h3 class='description'>name: {employe.name}</h3>
                            <h3 class='description'>price: {employe.price} THB.</h3>
                                    <Container fixed>
                                        <Grid container spacing={1} >
                                          <Grid item xs={10}> 
                                              <Stack spacing={1} direction="row">
                                                  <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={pickup}>
                                                      <Button 
                                                      variant="contained" 
                                                      color="success"
                                                      type="submit " 
                                                      > Buy 
                                                      </Button> 
                                                  </Box>
                                              </Stack>
                                          </Grid>
                                        </Grid>
                                      </Container>
                              </div>
                          </div>
                        </div>
                        
                    </Grid>
                    );
                 })}
                  </Grid>
                  </Box>
              </Container>
            </Box>
            <br/>
            <br/>
        </div>
        
        </ThemeProvider>
   </>
  );
}
// setData(JSON.stringify(res.data.results)) 
                // let mystyle = [{idsx:'0',ids:'card mocha'},
                // {idsx:'1',ids:'card americano'},
                // {idsx:'2',ids:'card cappuccino'},
                // {idsx:'3',ids:'card latte'},
                // {idsx:'4',ids:'card espresso'}];
                // let All = []
                // All.push(mystyle)
                // All.push(res.data.results)
                // console.log(All)
                // setimgs(mystyle)
                // console.log(mystyle)