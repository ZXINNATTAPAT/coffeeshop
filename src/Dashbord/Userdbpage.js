import React,{useEffect} from "react";
import AppBardb from "./Appbardb";
import {
    Container,
    Typography,
  } from "@mui/material";
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';


export default function Userdbpage() {
    const [usersdb,setusersdb] = React.useState([])
    

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
      ];

//   const rows = shopItems;
//   console.log(rows)

  return (
    <>
        <AppBardb />
        <Container >
                <Box
                  sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%'
                  
                  }}>
                      
                    <Container component="main"  className="card2" >
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
                                <div> 
                                   
                                </div>
                        </Container>
                        </Box>
                        
              <br />
              <br />
              
            </Container>

   </>
  );
}