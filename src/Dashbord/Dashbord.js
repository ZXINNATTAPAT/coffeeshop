import React from "react";
import AppBardb from "./Appbardb";
import { Stack,Grid } from "@mui/material";
import Orderdb from "./Orderdb";
import Userdb from "./Userdb";



export default function Dashboardpage() {


  return (
    <>
        <AppBardb />
        <Stack spacing={1} direction="row">
              <Grid item xs={3.5}>
                   <Orderdb />
              </Grid>
              <Grid item xs={3.5}>
                   <Userdb />
              </Grid>
        </Stack>
    
   </>
  );
}