import React, { useState, useEffect } from "react";
import { Box } from '@mui/system';
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import ButtonAppBar from "../Appbar";
import Grid from '@mui/material/Grid';
import Stack from '@mui/system/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// import Pay from "../Paymentpage/Pay";
import QRCode from 'qrcode.react';
import Usepoint from "../Paymentpage/Usepoint";
const generatePayload = require('promptpay-qr');


export default  function CartPage() {
  
  const [cartItems, setCartItems] = useState([]);


  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3333/bidlist/cart");
      const json = await response.json();
      setCartItems(json.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const removeFromCart = async () => {
      window.location='/Rreceipt'
  }
  

  useEffect(() => {
   fetchData();
  }, []);

 
  function calprice(){
    const datacalprice = cartItems ;
    const sumdata = [] ;
    let sumcal = 0 ;
    // const datacalamount = []
    const doubled = datacalprice.map((number) => (number.price * number.amount));
    for (let i = 0; i < doubled.length; i++) {
      sumdata.push(doubled[i])
      
    }
    for (let i = 0; i < sumdata.length; i++) {
      sumcal += sumdata[i]
    }
    return sumcal;
  }

  function Pay() {

    const [ phoneNumber, setPhoneNumber ] = useState("0661651693");
    
    const [ amount, setAmount ] = useState(0);         
    const [ qrCode ,setqrCode ] = useState("sample");

    const [telNumbers, setTelNumbers] = useState('');
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const data = new FormData(e.currentTarget);
      const jsonData = {
        Tel: data.get("Tel")
      };
    
      try {
        const response = await fetch('http://localhost:3333/pulldatatel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonData)
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
    
        const result = await response.json();
        // const ex = JSON.stringify(result)
        setUserData(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError('Failed to fetch data. Please try again later.');
      }
    }

    function handlePhoneNumber() {
      setPhoneNumber("0661651693");
    }
    
    function handleAmount() {
      setAmount(parseFloat(calprice()));
      
    }
    function handleQR() {
      setqrCode(generatePayload(phoneNumber, { amount }));
    }
    return(
      <div  className='description'>
        
        <h2>QR Code PromptPay</h2>
       
        
        <Grid item xs={3.5}>
          
          <Stack spacing={2} direction="row">
          <TextField
            type="hidden"
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
          /> 
          </Stack> 
        </Grid> 
          <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row">
            
           <TextField
                label="Enter Phone Numbers"
                variant="outlined"
                type="tel"
                id='Tel'
              />
              <Button type="submit" variant="contained" color="primary" size="medium">Check</Button>
            
           </Stack></form>
          <br/>
          
       
        <Stack spacing={2} direction="row">
          <TextField
            value={phoneNumber}
            type="hidden"
            onChange={handlePhoneNumber} 
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Total Price"
            defaultValue={amount}
            value = {amount}
            InputProps={{
              readOnly: true,
            }}
          />
            <Button variant="contained" onClick={handleAmount} size="medium">Confirm</Button>
        </Stack>  
        <Grid item xs={3.5}>
          <span className="info ">Click the confirm button to check all prices.</span>
        </Grid>
        <br/>
        <center>
        <Grid item xs={3.5}>
          <Button  variant="contained" color="success" onClick={handleQR}>Generate Promptpay QR</Button>
        </Grid>
        </center>
        <br/>
        {userData && (
        <Typography>
          Tel: {userData.Tel} <br />
          fname: {userData.fname} <br />
          lname: {userData.lname} <br />
        </Typography>
      )}

        <Grid item xs={3.5}>
          <center>
            <QRCode  value={qrCode} />
            <br/>
            <span className="info">*Please scan to pay.*</span>
          </center>
        </Grid>
        
        <center>
          
          <Button variant="contained" color="success" onClick={removeFromCart}>
            Paid
          </Button>
        <br/>
        
        <span className="info">When the scan is complete You press the payment button.</span>
        </center>
      </div>
     );
  }

  function Usepoint() {
    
      const [customerNumber, setCustomerNumber] = useState('');
      const [customerData, setCustomerData] = useState(null);
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:3333/login/db");
        const data = await response.json();
        setCustomerData(data.results);
      };
    
      // console.log(customerData)
      return (
        <div>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Customer Number"
            value={customerNumber}
            onChange={(event) => setCustomerNumber(event.target.value)}
          />
          <Button type="submit" variant="contained">Submit</Button>
       
          {customerData && (
        <div>
          <p>Customer Name: {customerData.fname}</p>
          <p>Points: {customerData.point}</p>
          <Button variant="contained">Redeem Points</Button>
        </div>
      )}

         
    
         </form>
         
         </div>
      );
    }
  

  function Alertssxx(){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handlecancle = () => {
      window.location='/coffee'
    };

    const handlepoint= () => {
      window.location='/coffee'
    };
  
    return (
      <div>
        <div >
                          <Stack spacing={1} direction="row">
                                <Grid item xs={4} >
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleClickOpen}
                                  >
                                    PAY
                                  </Button>
                                </Grid>
                                {/* <Grid item xs={4} >
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={handlepoint}
                                    >
                                      use points
                                    </Button>
                                </Grid>

                                <Grid item xs={4} >
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={handlecancle}
                                    >
                                      cancel
                                    </Button>
                                </Grid> */}
                          </Stack>
          </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="card4"
          
        >
          <DialogTitle id="alert-dialog-title" className="title">
            {"PAYMENT"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div >
                  {Pay()}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            
            
          </DialogActions>
        </Dialog>
      </div>
    );
    
  }

  function Alertssxx2(){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handlecancle = () => {
      window.location='/coffee'
    };

    const handlepoint= () => {
      window.location='/coffee'
    };
  
    return (
      <div>
        <div >
                          <Stack spacing={1} direction="row">
                                <Grid item xs={4} >
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleClickOpen}
                                  >
                                    use points
                                  </Button>
                                </Grid>
                               

                                <Grid item xs={4} >
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={handlecancle}
                                    >
                                      cancel
                                    </Button>
                                </Grid>
                          </Stack>
          </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="card4"
          
        >
          <DialogTitle id="alert-dialog-title" className="title">
            {"PAYMENT"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div className="card3">
                  {Usepoint()}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            
            
          </DialogActions>
        </Dialog>
      </div>
    );
    
  }
  
  return (
  <> 
        <div>
            {ButtonAppBar()}
        </div>
        <div >
          <center>
            <Container >
                <Box
                  sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '75%'
                  
                  }}>
                    <Container component="main"  className="card2" >
                      <br/>
                        <Typography  variant="h3" >
                          Order Cart
                        </Typography>
                        <br/>
                        <TableContainer>
                          <Table >
                            <TableHead >
                              <TableRow style={{backgroundColor:"whitesmoke"}}>
                                <TableCell >Product Name </TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                {/* <TableCell>Note</TableCell> */}
                              </TableRow>
                            </TableHead>
                            
                            <TableBody>
                              {cartItems.map((item) => (
                                <TableRow key={item.bid_id}>
                                  {/* <TableCell>{item.product_id}</TableCell> */}
                                  <TableCell>{item.sweets}</TableCell>
                                  <TableCell>{item.Type}</TableCell>
                                  <TableCell>{item.price}</TableCell>
                                  <TableCell>{item.amount}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                            <TableBody>
                              <TableRow>
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell>Total price :{calprice()} THB </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <br/>


                       <div className="right2">
                          <Stack spacing={1} direction="row">
                             
                          <Grid item xs={3.5}>
                            
                            {Alertssxx()}
                            
                          </Grid>

                          <Grid item xs={3.5}>
                            
                            {Alertssxx2()}

                          </Grid>

                          <Grid item xs={3.5}>

                            

                          </Grid>
                          </Stack>
                        </div>
                        </Container>
                        </Box>
              <br />
              <br />
              
            </Container>
          </center>
    </div>
    </>
  );
}



