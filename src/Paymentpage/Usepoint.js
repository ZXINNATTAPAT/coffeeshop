import React, { useState } from 'react';
// import setpriceorder from '../pageorder/Logic';
import { TextField } from '@mui/material';


export default function Usepoint() {

  const [ phoneNumber, setPhoneNumber ] = useState(" ");   
  

  return(
    <div>
      <h2>Usepoint</h2>
      
      <TextField
          required
          id="outlined-required"
          label="You Phonenumber"
          defaultValue="You Phonenumber"
        />
      
      
      
    </div>
   );
}
