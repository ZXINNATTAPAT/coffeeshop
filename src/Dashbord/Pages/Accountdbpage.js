import React,{useEffect} from "react";
import {
    Container,
    Grid,
    Stack,
    Typography,
    TextField,
    Button
  } from "@mui/material";
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import AppBardb from "../Appbardb";


export default function Accountdbpage() {
    const [shopItems,setshopItems] = React.useState([])
    const [cogs ,setcogs] = React.useState(0)// total cost of goods sold for the month
    const [labc , setlabc] = React.useState(0) // total labor costs for the month
    const [fixedc, setfixedc] = React.useState(0)// total fixed costs for the month
    const [netProfit , setnetProfit ] = React.useState(0)// total fixed costs for the month

    function calAccounting(x){
        // const revenue = 5000; // total revenue for the month
        // const costOfGoodsSold = 800; 
        // const laborCosts = 800;
        // const fixedCosts = 200; 

        // Calculate gross profit
        const grossProfit = x - cogs;
        // Calculate net profit
        const netProfit = grossProfit - labc - fixedc;
        return netProfit ;
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setnetProfit(calAccounting(calprice()))

    }

    const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3333/bidlist/shops");
          const json = await response.json();
          const rows = json.results.map((row, index) => ({ ...row, id: index }));
          setshopItems(rows);
          // console.log(json.results)
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

      function calprice(){
        const datacalprice = shopItems ;
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

      function calnum(){
        const datacalprice = shopItems ;
        const sumdata = [] ;
        let sumcal = 0 ;
        // const datacalamount = []
        const doubled = datacalprice.map((number) => (number.amount));
        for (let i = 0; i < doubled.length; i++) {
          sumdata.push(doubled[i])
          
        }
        for (let i = 0; i < sumdata.length; i++) {
          sumcal += sumdata[i]
        }
        return sumcal;
      }
    
    
      const columns = [
        { field: 'bid_id', headerName: 'ID', width: 50 },
        {
          field: 'product_id',
          headerName: 'Product ID',
          width: 150,
          editable: true,
        },
        {
          field: 'Type',
          headerName: 'Type',
          width: 150,
          editable: true,
        },
        {
          field: 'price',
          headerName: 'Price',
          type: 'number',
          width: 50,
          editable: true,
        },
        {
          field: 'amount',
          headerName: 'Amount',
          type: 'number',
          width: 120,
          editable: true,
        },
        {
          field: 'sweets',
          headerName: 'Sweets',
          width: 180,
        },
      ];

//   const rows = shopItems;
//   console.log(rows)

  return (
    <>
        <AppBardb />
        <Container >

                <Box
                  sx={{
                  marginTop: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%'
                  
                  }}>
                      
                    <Container component="main"  >
                      <br/>
                        <Typography  variant="h3" >
                          Accounting
                        </Typography>
                        <br/>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={shopItems}
                                columns={columns}
                                getRowId={(row) => row.bid_id}
                                initialState={{
                                    pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                disableRowSelectionOnClick
                                />
                            </div>
                        </Box>
                        <br/>
                               
                                {/* <Stack spacing={3.5} direction="row">
                                    <Grid>
                                        <h4>Total income : {calprice()} THB </h4>
                                    </Grid>
                                    <Grid>
                                        <h4>netProfit  : {calAccounting(calprice())} THB </h4>
                                    </Grid>
                                    <Grid>
                                        <h4>Total amount : {calnum()}  </h4>
                                    </Grid>
                                </Stack> */}

                        <Typography  variant="h3">
                           Calculate netProfit
                        </Typography>
                        
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                          <Stack direction="row"  spacing={4}> 
                          <Grid>
                              <TextField
                                  margin="normal"
                                  required
                                  label="costOfGoodsSold"
                                  id="cogs"
                                  name="cogs"
                                  value={cogs}
                                  onChange={e => setcogs(e.target.value)}
                              />
                          </Grid>
                          <Grid>
                              <TextField
                                  margin="normal"
                                  required
                                  name="labc"
                                  label="laborCosts"
                                  id="labc"
                                  value={labc}
                                  onChange={e => setlabc(e.target.value)}
                              />
                          </Grid>
                          <Grid>
                              <TextField
                                  margin="normal"
                                  required
                                  name="fixedc"
                                  label="fixedCosts"
                                  id="fixedc"
                                  value={fixedc}
                                  onChange={e => setfixedc(e.target.value)}
                              />
                          </Grid> 
                          <Grid>
                            <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 2 }}>
                                  confirm
                              </Button>
                          </Grid>
                          </Stack>
                    
                           
                        </Box>
                                <br/>
                                <Grid >
                                  <Typography  variant="h4"> Amount    = {calnum()} item</Typography><br/>
                                  <Typography  variant="h4"> Income    = {new Intl.NumberFormat('th-TH', { style: "currency", currency: "THB" }).format(calprice())}</Typography><br/>
                                  
                                  <Typography  variant="h4"> NetProfit = {new Intl.NumberFormat('th-TH', { style: "currency", currency: "THB" }).format(netProfit)}</Typography>
                                  <span>Please enter the information to be calculated first.</span>
                                  </Grid>
                        </Container>
                        </Box>
                        
              <br />
              <br />
              
            </Container>

   </>
  );
}