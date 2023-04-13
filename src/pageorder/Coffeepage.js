import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/system/Stack';
import './Album.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  CssBaseline } from '@mui/material';
import TextField from '@mui/material/TextField';
import ButtonAppBar from '../Appbar';
import { useTheme } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
// import useAuthentication from '../UseAuthentication';
// import TextField from '@mui/material/TextField';
// import { passingdata } from '../../pageorder/Logic';


export default function Coffeepage() {
  
  const theme = createTheme();
  const [datas, setData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [als,setals] = useState(0);
  // const orederids  = 'E001'
  

  console.log(als)
  function Alerts(x){
    if(x !== 0){
      return(
        <>
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            <Alert onClose={() => {
              setals(0)
            }}>Order Success</Alert>
          </Slide>
        </>
      );
    }
  }
  

const fetchData = async () => {
        
  try {
    const response = await fetch("http://localhost:3333/manu/pick");
    const json = await response.json();
    setData(json.results);
    console.log(datas)
  } catch (error) {
    console.error("Error fetching data: ", error);
  }

  

};

//############### for passing order to db : bid ################
const passingorder = async (event) => {
  event.preventDefault();
  
  const data = new FormData(event.currentTarget);
  const jsonData = {
    product_id: data.get("product_id"),
    Type: data.get("Type"),
    price: data.get("price"),
    amount: data.get("amount"),
    sweets: data.get("sweets")
  };

  try {
    const response = await fetch("http://localhost:3333/bidlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonData)
    });

    const result = await response.json();

    if (result.status === "ok") {
      setals(1);
      setChecked(true) 
      setTimeout(() => {
        window.location = '/coffee';
      }, 1000); 
      //passing order success 
      // window.location='/Typepage'
    } 
    else {
      alert("passing failed");
      setTimeout(() => {
        window.location = '/coffee';
      }, 1000); 
      console.log(result);
    }
  } catch (error) {
    console.error("Error submitting order: ", error);
    console.log(jsonData);
  }

  try {
    const response = await fetch("http://localhost:3333/bidlist/shop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonData)
    });

    const result = await response.json();

    if (result.status === "ok") {
      // setals(1);
      // setChecked(true)
      // //passing order success 
      // // window.location='/Typepage' 
     
    } 
    else {
      alert("passing failed");
      console.log(result);
    }
  } catch (error) {
    console.error("Error submitting order: ", error);
    console.log(jsonData);
  }
 
 
};

useEffect(() => {
  fetchData();
}, []);

// console.log(datas);

// //########### Button back page ####################
// const handlelogoutback =(event) =>{
//     event.preventDefault();
//     window.location ='/Album'}


const theme2 = useTheme();


const listItem = datas.map(employe =>
  <Grid item xs={4} >
    <div key={employe.id}>
              <div className={employe.npng}>
                        <div className='info'>
                        <h2 className='title'>{employe.name_manu} {employe.price} THB</h2>
                        {/* <h1 className='description'>NAME: {employe.name_manu} PRICE: {employe.price} THB.</h1>  */}
                        <div className='description'>
                        <Box component="form" noValidate onSubmit={passingorder} sx={{ mt: 1 }}> 
                    
                              <Stack spacing={1} direction="row">
                          
                                <Grid item xs={3.5}>
                                  <TextField name="product_id" 
                                      id='product_id'
                                      label="product_id"
                                      defaultValue={employe.product_id}
                                      type="hidden" 
                                      variant="standard"
                                      InputProps={{
                                        readOnly: true,
                                      }}/>
                                </Grid> 
                                
                                <Grid item xs={3.5}>
                                    <TextField name="price" 
                                        id='price' 
                                        label="price"defaultValue={employe.price}
                                        type="hidden" 
                                        variant="standard" 
                                        InputProps={{
                                          readOnly: true,
                                        }}/>
                                </Grid> 
                                
                                {/* <Grid item xs={3.5}>
                                    <TextField name="order_id" 
                                        id='order_id' 
                                        label="order_id"defaultValue={orederids}
                                        type="text" 
                                        InputProps={{
                                          readOnly: true,
                                        }}/>
                                </Grid> */}
                              </Stack>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                                              sweetness(%)
                                          </FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="sweets" id='sweets'
                                                type="text">
                                                  <FormControlLabel value={employe.name_manu+" 0%"}  control={<Radio />} label="0" />
                                                  <FormControlLabel value={employe.name_manu+" 25%"}  control={<Radio />} label="25" />
                                                  <FormControlLabel value={employe.name_manu+" 50%"}  control={<Radio />} label="50" />
                                                  <FormControlLabel value={employe.name_manu+" 75%"}  control={<Radio />} label="75" />
                                                  <FormControlLabel value={employe.name_manu+" 100%"}  control={<Radio />} label="100" />
                                            </RadioGroup>

                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                        Coffee type
                                    </FormLabel>
                                        <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="Type"
                                        id='Type'
                                        type="text"
                                    >
                                      <FormControlLabel value="Hot" id='Type' control={<Radio />} label="Hot" />
                                      <FormControlLabel value="Ice" id='Type' control={<Radio />} label="Ice" />
                                      <FormControlLabel value="Mix" id='Type' control={<Radio />} label="Mix" />
                                    </RadioGroup>

                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                        Amount
                                    </FormLabel>

                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="amount"
                                        id='amount'
                                        type="amount"
                                    >
                                      <FormControlLabel value= "1" id='amount' control={<Radio />} label="1 item" />
                                      <FormControlLabel value="2" id='amount' control={<Radio />} label="2 item" />
                                      <FormControlLabel value="3" id='amount' control={<Radio />} label="3 item" />
                                    </RadioGroup>
                                   
                                        <br/>
                            <div> 
                           
                                      
                                <Button variant="contained" 
                                          color="success" 
                                          type='submit'

                                          >
                                  ADD
                                </Button>
                            </div>
                        </Box>
                  </div>
              </div>
          </div>
      </div>
   </Grid>
);



  return (
    <> 
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div>
        {/* <span>{JSON.stringify(datas)}</span> */}
        <div>
          {ButtonAppBar()}
        </div>
            <div className="right">
              {/* <Stack  sx={{ width: '25%' ,position:'fixed'}} spacing={2}> */}
                  {Alerts(als)}
              
            </div>
        <ThemeProvider theme={theme2}>
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
                        {/* <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                           spacing={{ xs: 1, sm: 2, md: 4 }}
                          >
                          <button className='button-17' style={{
                             backgroundColor:"green" ,color:"white"}}>
                            Home </button>
                          
                          <button className='button-17' >logout </button>
                          <button className='button-17' onClick={handlelogoutback}>Back </button>
                          </Stack><br/> */}
                          <br/>
                          <div >
                          <div className="article-card">
                           {/* promotion */}
                          </div>
                        </div>
              </Grid>
              {/* card */}
              
                {listItem}
              
            </Grid>
          </Box>
        </Container>
          </Box>
       </ThemeProvider>     
            <br/>
            <br/>
      </div>
        
    </ThemeProvider>
   </>
  );
}


  