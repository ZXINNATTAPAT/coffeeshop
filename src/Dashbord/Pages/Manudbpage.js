import React,{useEffect} from "react";
import AppBardb from "../Appbardb";
import { Container, Stack} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Grid, TextField, Button } from '@mui/material';

export default function Manudb() {

    const [shopItems,setshopItems] = React.useState([])
    
    const [formData, setFormData] = React.useState({
      name_manu :' ', product_id: ' '  , price :' ', npng:' '
    });

    const [formData2, setFormData2] = React.useState({
      product_id:' '
    });

    const Addmanu = (event) =>{
        event.preventDefault();
      
            fetch('http://localhost:3333/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          window.location = '/Manudb'
          alert('Stock added successfully!');
        } else {
          alert('Failed to add stock.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    }
    const Deletemanu = (event) =>{
      event.preventDefault();
      fetch('http://localhost:3333/menu/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData2),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'ok') {
            window.location= '/Manudb'
            console.log('Product deleted successfully');
          } else {
            console.error(data.message);
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

      const handleInputChange2 = (event) => {
      const { name, value } = event.target;
      setFormData2((prevState) => ({
      ...prevState,
      [name]: value,
      }));
      };

    const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3333/manu/pick");
          const json = await response.json();
          const rows = json.results.map((row, index) => ({ ...row, id: index }));
          setshopItems(rows);
          console.log(json.results)
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

     
      const columns = [
        { field: 'id', headerName: 'id', width: 50 },
        {
          field: 'product_id',
          headerName: 'Product ID',
          width: 100,
          editable: true,
        }, 
        {
          field: 'price',
          headerName: 'Price',
          type: 'number',
          width: 100,
          editable: true,
        },
        {
          field: 'name_manu',
          headerName: 'name_manu',
          width: 150,
          editable: true,
        },
        {
          field: 'npng',
          headerName: 'npng',
          width: 150,
          editable: true,
        },
       
      ];


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
                          Menu
                        </Typography>
                        <br/>
                       
                            <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={shopItems}
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
                        
                        <br/>
                                
                      <Stack direction="row" spacing={4}>
                        <Grid>
                        <Typography  variant="h3">
                        Add Menu
                        </Typography>
                        
                        <Box component="form" noValidate onSubmit={Addmanu} sx={{ mt: 1 }}>
                          <Stack direction="row"  spacing={4}> 
                          <Grid>
                              <TextField
                                  margin="normal"
                                  required
                                  label="product_id"
                                  id="product_id"
                                  name="product_id"
                                  value={formData.product_id}
                                  onChange={handleInputChange}
                              />
                          </Grid>
                          <Grid>
                              <TextField
                                  margin="normal"
                                  required
                                  name="name_manu"
                                  label="name_manu"
                                  id="name_manu"
                                  value={formData.name_manu}
                                  onChange={handleInputChange}
                              />
                          </Grid>
                          <Grid>
                              <TextField
                                  margin="normal"
                                  required
                                  name="price"
                                  label="price"
                                  id="price"
                                  value={formData.price}
                                  onChange={handleInputChange}
                              />
                          </Grid>
                          </Stack>
                          <Grid>
                              <TextField
                                  margin="normal"
                                  required
                                  name="npng"
                                  label="npng"
                                  id="npng"
                                  value={formData.npng}
                                  onChange={handleInputChange}
                              />
                          </Grid>
                        
                        <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 2 }}>
                        confirm
                        </Button>
                        </Box>
                        </Grid>
                        <br/>

                        <Grid>

                        <Typography  variant="h3">
                          Delete Menu
                        </Typography>
                        <Box component="form" noValidate onSubmit={Deletemanu} sx={{ mt: 1 }}>
                        
                          <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="product_id"
                                    id="product_idd"
                                    name="product_id"
                                    value={formData2.product_id}
                                    onChange={handleInputChange2}
                                />
                          <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 2 }}>
                          confirm
                          </Button>
                        </Box>
                        
                        </Grid>
                    </Stack>
                   </Container>
                        
              <br />
              <br />
              </Box>
        </Container>

   </>
  );
}