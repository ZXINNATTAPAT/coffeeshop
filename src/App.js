import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { brown } from '@mui/material/colors';
import './App.css';


export default function App() {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(brown[500]),
    backgroundColor: brown[500],
    '&:hover': {
      backgroundColor: brown[700],
    },
  }));
  return (
    <div className='body'>
        
        <div class="center">
        <h1> Lisa Cafe' </h1>
        <p>Welcome, you can order drinks from this kiosk.</p>
        <ColorButton variant="contained" href="/Login">
          START
        </ColorButton>
        
        </div>
        <div class="center2" >
          <p>quality coffee from Thailand</p>
          </div>
   </div>
  );
}
