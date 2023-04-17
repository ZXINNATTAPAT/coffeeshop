import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { deepPurple, brown } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";


export default function ButtonAppBar() {

  const [countitems, setcountitems] = useState([]);

  const fetchData = async () => {
        
    try {
      const response = await fetch("http://localhost:3333/bidlist/cart");
      const json = await response.json();
      const s = json.results
      setcountitems(s.length);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const removelogin = async () => {
    try {
      const response = await fetch("http://localhost:3333/login/datatel/delete", {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("logout")
      window.location='/login'
      localStorage.removeItem('token')
      // setCartItems();
    } catch (error) {
      console.error("Error removing item from login: ", error);
    }
  };

  useEffect(() => {
   fetchData();
  }, []);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 2px',
    },
  }));

    const theme = createTheme({
  palette: {
    primary: {
      main: brown[800],
    },
    secondary: {
      main: deepPurple[200],
    },
  },
});
const gotocart =(event) =>{
  event.preventDefault();
  window.location ='/Cart'}


  return (
    <>
    
    <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={theme}>
            <AppBar position="static" color='primary'>
                <Toolbar>

                    <Typography variant="h4" component="div" sx={{ flexGrow: 2 }}>

                        LISA CAFE'
                        
                    </Typography>

                  <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 , fontSize: 50 }}
                    >
                        <AccountCircleIcon sx={{ fontSize: 32 }} >
                          
                        </AccountCircleIcon>
                    </IconButton> 
                  
                  <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="cart"
                        sx={{ mr: 2 , fontSize: 50 }}
                        onClick={gotocart}
                    >
                      
                  <StyledBadge badgeContent={countitems} color="secondary">
                            <ShoppingCartIcon sx={{ fontSize: 30 }}  />
                  </StyledBadge>
                    </IconButton> 

                  
                  <Button 
                      color="inherit" 
                      size="large" 
                      sx={{ fontSize: 18 }} 
                      onClick={removelogin}>
                    Logout
                  </Button>
                    
                    
                </Toolbar>
            </AppBar>
      </ThemeProvider>
    </Box>
   </>
  );
}