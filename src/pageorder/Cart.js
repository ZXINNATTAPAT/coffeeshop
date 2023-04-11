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
// import Usepoint from "../Paymentpage/Usepoint";
const generatePayload = require('promptpay-qr');


export default  function CartPage() {

  const [telNumbers, setTelNumbers] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const fetchData = async () => {
    //view cart 
    try {
      const response = await fetch("http://localhost:3333/bidlist/cart");
      const json = await response.json();
      setCartItems(json.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  
    //view data users
    try {
      const response = await fetch("http://localhost:3333/login/datatel/get");
      const json = await response.json();
      const dataset = json.results[0] ;

      setTelNumbers(dataset.Tel);
      console.log(dataset.Tel)
      
    } catch (error) {
      console.error("Error fetching data: ", error);
    }

    
  };

  const removeFromCart = async () => {
    try {
      const response = await fetch("http://localhost:3333/login/datatel/get");
      const json = await response.json();
      const dataset = json.results[0] ; 

      console.log(dataset)
      let sumcal = 0 ;
      const sumdata = [] ;
      const doubled = cartItems.map((number) => (number.amount));
      for (let i = 0; i < doubled.length; i++) {
        sumdata.push(doubled[i])
      }
      for (let i = 0; i < sumdata.length; i++) {
        sumcal += sumdata[i]
      }

      for(let i=1 ; i<=sumcal; i++){
        fetch('http://localhost:3333/pulldatatel/point', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({Tel:dataset.Tel}
          
          // replace with the phone number
        )
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
   
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

    const [userData, setUserData] = useState([]);

    // const [error, setError] = useState(null);//not use 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const data = new FormData(e.currentTarget);
      const jsonData = {
        Tel: data.get("Tel")
      };
      console.log(jsonData)
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
        setUserData(result.usersdata);
        console.log(result.usersdata);
      } catch (error) {
        console.error('Error fetching data: ', error);
        // setError('Failed to fetch data. Please try again later.');
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
                name="Tel" 
                type="Tel" 
                id='Tel'
                defaultValue={telNumbers}
                value={telNumbers}
                InputProps={{
                  readOnly: true,
                }}
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
          {/* Tel: {userData.Tel} <br /> */}
          name: {userData.fname} {userData.lname} <br />
          point: {userData.point} <br />
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
    
    const [ amount, setAmount ] = useState(0);      
    const [userData, setUserData] = useState([]);
    const removeFromCart2 = async () => {
      try {
        //######### ดึงข้อมูลในส่วนของเบอร์โทรที่loginเข้ามา ##############
        const response = await fetch("http://localhost:3333/login/datatel/get");
        const json = await response.json();
        const dataset = json.results[0] ; 
        console.log(cartItems)

      //################ ดึงข้อมูล point ของ users #####################
            fetch('http://localhost:3333/pulldatatel/usepoint', 
            {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({Tel:dataset.Tel}
            )
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
        
      //############## ทำการลบข้อมูลที่ใช้แต้มแลกเอาออกจากตระกร้า #################
      fetch('http://localhost:3333/bidlist/cart/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bid_id: cartItems[0].bid_id
        })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    }

       catch (error) {
        console.error("Error fetching data: ", error);
      }
      window.location='/cart'
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const data = new FormData(e.currentTarget);
      const jsonData = {
        Tel: data.get("Tel")
      };
      console.log(jsonData)
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
        setUserData(result.usersdata);
        console.log(result.usersdata);
      } catch (error) {
        console.error('Error fetching data: ', error);
        // setError('Failed to fetch data. Please try again later.');
      }
    }

    function handleAmount() {
      setAmount(parseFloat(calprice()));
      
    }
    
    
      // console.log(customerData)
      return (
        <div  className='description'>
        
        <Grid item xs={3.5}>
          
          <Stack spacing={2} direction="row">
         
          </Stack> 
        </Grid> 

          <form onSubmit={handleSubmit}>

          <Stack spacing={2} direction="row">
            
           <TextField
                label="Enter Phone Numbers"
                variant="outlined"
                name="Tel" 
                type="Tel" 
                id='Tel'
                defaultValue={telNumbers}
                value={telNumbers}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Button type="submit" variant="contained" color="primary" size="medium">Check</Button>
            
           </Stack></form>
          <br/>
          
       
        <Stack spacing={2} direction="row">
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
        </center>
        <br/>
        {userData && (
        <Typography>
          {/* Tel: {userData.Tel} <br /> */}
          name: {userData.fname} {userData.lname} <br />
          point: {userData.point} <br />
        </Typography>
      )}

        
        <center>
          
          <Button variant="contained" color="success" onClick={removeFromCart2}>
            Paid
          </Button>
        <br/>
        
        <span className="info">When the scan is complete You press the payment button.</span>
        </center>
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

    // const handlecancle = () => {
    //   window.location='/coffee'
    // };

    // const handlepoint= () => {
    //   window.location='/coffee'
    // };
  
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

    // const handlepoint= () => {
    //   window.location='/coffee'
    // };
  
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
              <div >
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
                    <Container component="main"  >
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



