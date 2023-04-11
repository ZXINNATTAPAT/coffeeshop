import React,{useEffect} from "react";
import AppBardb from "../Appbardb";
import { Stack,Grid } from "@mui/material";
import Orderdb from "../Props/Orderdb";
import Userdb from "../Userdb";
import Manudb from "../Props/Manudb";
import Accountdb from "../Props/Accountdb";
import Orderchart from "../Props/Orderdbchart";


export default function Dashboardpage() { 

   useEffect(() => {
        const token =localStorage.getItem('token')
  
        fetch("http://localhost:3333/authen/db", {
            method: "PUT", // or 'PUT'
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




  return (
    <>
        <AppBardb />
          <Grid>
                <Stack spacing={1} direction="row">

                          <Orderchart />

                </Stack>

                <Stack spacing={1} direction="row">
                      
                          <Orderdb />
                      
                          <Userdb />
                      
                </Stack>
          </Grid>

          <Grid>
               <Stack spacing={1} direction="row">

                         <Manudb />
            
                         <Accountdb />
               
               </Stack>
          </Grid>
          
          
    
   </>
  );
}