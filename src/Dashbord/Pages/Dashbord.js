import React,{useEffect} from "react";
import AppBardb from "../Appbardb";
import { Stack,Grid } from "@mui/material";
import Orderdb from "../Props/Orderdb";
import Userdb from "../Userdb";
import Manudb from "../Props/Manudb";
import Accountdb from "../Props/Accountdb";
import Orderchart from "../Props/Orderdbchart";


export default function Dashboardpage() { 
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