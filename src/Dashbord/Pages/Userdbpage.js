import React,{useEffect} from "react";
import AppBardb from "../Appbardb";
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Grid, TextField, Button } from '@mui/material';
import { Container, Stack} from "@mui/material";


export default function Userdbpage() {
    const [usersdb,setusersdb] = React.useState([])
    const [formData, setFormData] = React.useState({
          fname: '',
          lname: '',
          Tel: ''
        });

    const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3333/login/db");
          const json = await response.json();
          const rows = json.results.map((row, index) => ({ ...row, id: index }));
          setusersdb(rows);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      const Deleteusers = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsonData = {
          Tel: data.get('Tel')
        };
        fetch("http://localhost:3333/usersdelete", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        })
          .then((response) => response.json())
          .then( data => {
            if(data.status === 'ok'){
               alert('delete users succcess')
            }
            else{alert('delete users failed')}
          })
      .catch((error) => {console.error("Error:", error);});
      }
      
    
      const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      }

      const Editusers = (event) => {
        event.preventDefault();
        // const data2 = new FormData(event.currentTarget);
        //   const jsonData2 = {
        //     Tel: data2.get('Tel2'),
        //     fname: data2.get('fname'),
        //     lname: data2.get('lname')
        //   };
          fetch("http://localhost:3333/usersedit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
          .then((response) => response.json())
          .then(data2 => {
            if(data2.status === 'ok'){
              alert('Update users succcess')
               window.location = '/Userdb'
            }
            else{
              alert('Update users failed')
            }
          })
          .catch((error) => {console.error("Error:", error);});
        }
          
    
      useEffect(() => {
        fetchData();
      }, []);

      

      const columns = [
        { field: 'users_id', headerName: 'ID', width: 50 },
        {
          field: 'Tel',
          headerName: 'Tel',
          width: 150,
          editable: true,
        },
        {
          field: 'fname',
          headerName: 'fristname',
          width: 150,
          editable: true,
        },
        {
          field: 'lname',
          headerName: 'lastname',
          width: 150,
          editable: true,
        },
        {
          field: 'type_date',
          headerName: 'type_date',
          width: 200,
          valueGetter: (params) => {
            const timestamp = params.value;
            const date = new Date(timestamp);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();
            return `${formattedDate} ${formattedTime}`;
          }
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
                        <Typography  variant="h3" >
                          Users
                        </Typography>
                        <br/>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={usersdb}
                                columns={columns}
                                getRowId={(row) => row.users_id}
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
                        
                          <Typography  variant="h3" >
                                    Delete
                              </Typography>

                                <Box component="form" noValidate onSubmit={Deleteusers} sx={{ mt: 1 }}>
                                
                                    <Stack direction="row"  spacing={2}> 
                                    <Grid>
                                        <TextField
                                            margin="normal"
                                            required
                                            label="Tel"
                                            id="Tel"
                                            name="Tel"
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

                                <Box component="form" noValidate  onSubmit={Editusers} sx={{ mt: 1 }}> 
                                
                                <Typography  variant="h3" >
                                    Edit
                                </Typography>
                                    <Stack direction="row"  spacing={4}> 
                                    <Grid>
                                        <TextField
                                            margin="normal"
                                            required
                                            label="Tel"
                                            id="Tel"
                                            name="Tel"
                                            value={formData.Tel}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                   
                                    <Grid>
                                        <TextField
                                            margin="normal"
                                            required
                                            label="fname"
                                            id="fname"
                                            name="fname"
                                            type="text"
                                            value={formData.fname}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid>
                                        <TextField
                                            margin="normal"
                                            required
                                            label="lname"
                                            id="lname"
                                            name="lname"
                                            type="text"
                                            value={formData.lname}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid>
                                      <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 2 }}>
                                         confirm
                                      </Button>
                                    </Grid>  
                                      </Stack>
                                  </Box>
                              
                        </Container>
                        </Box>
                        
              <br />
              <br />
              
            </Container>

   </>
  );
}