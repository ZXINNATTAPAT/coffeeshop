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
    Button
  } from "@mui/material";

export default function Rreceipt() {
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
        try {
          const response = await fetch("http://localhost:3333/bidlist/cartdelete", {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          alert("payment suscess")
          window.location='/Album'
          // setCartItems();
        } catch (error) {
          console.error("Error removing item from cart: ", error);
        }

        // try {
        //   const response = await fetch("http://localhost:3333/login/datatel/delete", {
        //     method: "DELETE",
        //   });
        //   if (!response.ok) {
        //     throw new Error("Network response was not ok");
        //   }
        //   alert("logout")
        //   window.location='/'
          
        //   // setCartItems();
        // } catch (error) {
        //   console.error("Error removing item from login: ", error);
        // }
      };

    useEffect(() => {
        fetchData();
       }, []);
    return (  
        <>
         <Container >
            <center>
                <Box
                  sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '75%'
                  }}>

        <Container component="main"   >
            <center>
                      <br/>
                      
                            <Box
                        sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '75%'
                        }}>
                                <Typography  variant="h3" >
                                Receipt
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
                                        <TableCell>Date</TableCell>
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
                                        <TableCell>{new Date(item.type_date).toLocaleString('en-US')}</TableCell>

                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table> 
                                </TableContainer>
                            </Box> </center>
                            <br/>

                    <div className="rigth">
                            <Button  variant="contained"
                                    color="success" 
                                    onClick={removeFromCart}>
                                continue
                            </Button>
                    </div>
        </Container>
     
                    
                    </Box>
                        </center> 
                       
                    </Container>

                    {/* <div className="right2"> */}
                       
                    {/* </div> */}
        </>
    );
}
