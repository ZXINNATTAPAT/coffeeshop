import React,{useEffect,useState} from "react";
import AppBardb from "./Appbardb";
import {Container,Stack} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Grid, TextField, Button } from '@mui/material';


export default function Stockdbpage() {
    const [usersdb,setusersdb] = React.useState([])
    const [formData, setFormData] = useState({
                product_name: '',
                quantity: '',
                note: '',
              });

    const submitstock = (event) =>{
            event.preventDefault();
           
                fetch('http://localhost:3333/stock/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 'ok') {
              alert('Stock added successfully!');
            } else {
              alert('Failed to add stock.');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      
    }
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
    const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3333/stock/get");
          const json = await response.json();
          const rows = json.results.map((row, index) => ({ ...row, id: index }));
          setusersdb(rows);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

      const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
          field: 'product_name',
          headerName: 'product_name',
          width: 150,
          editable: false,
        },
        {
          field: 'quantity',
          headerName: 'quantity',
          width: 150,
          editable: false,
        },
        {
          field: 'note',
          headerName: 'note',
          width: 150,
          editable: false,
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
                      
                    <Container component="main" >
                      <br/>
                      <Stack spacing={5}>
                        <Grid>
                        <Typography  variant="h3" >
                          Stock
                        </Typography>
                        <br/>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={usersdb}
                                columns={columns}
                                getRowId={(row) => row.id}
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
                                <div> 
                                    <Stack spacing={2} direction="row">
                                        
                                        <Button  variant="contained">Add Report</Button>
                                        <Button  variant="contained">Fixed stock</Button>
                                   </Stack>
                                </div>
                    </Grid>

                    <Grid  >
                    
                        <Typography component="h1" variant="h4">
                        Add Stock
                        </Typography>
                        <Box component="form" noValidate onSubmit={submitstock} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Product Name"
                            id="product_name"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="quantity"
                            label="Quantity"
                            type="number"
                            id="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="note"
                            label="Note"
                            type="text"
                            id="note"
                            value={formData.note}
                            onChange={handleInputChange}
                        />
                        <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Add Stock
                        </Button>
                        </Box>
                    
                    </Grid>
                </Stack>
                                
                    </Container>
                </Box>
                        
              <br />
              <br />
              
            </Container>

   </>
  );
}

