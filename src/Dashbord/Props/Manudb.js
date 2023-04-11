import React,{useEffect} from "react";
// import AppBardb from "./Appbardb";
import {
    Container,
    Typography,
  } from "@mui/material";
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';


export default function Manudb() {

    const [shopItems,setshopItems] = React.useState([])
    

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
        { field: 'id', headerName: 'ID', width: 50 },
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
       
      ];


  return (
    <>
        {/* <AppBardb /> */}
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
                          Menu
                        </Typography>
                        <br/>
                        <Box sx={{ height: 400, width: '100%' }}>
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
                        </Box>
                        <br/>
                                
                        </Container>
                        </Box>
                        
              <br />
              <br />
              
            </Container>

   </>
  );
}