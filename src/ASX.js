// import React, { useState, useEffect } from 'react';
// import { Box } from '@mui/system';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// // import Stack from '@mui/system/Stack';
// import axios from 'axios';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/system/Stack';
// import '../src/pageorder/Album.css';

// export default function ASX() {
//   const [datas, setData] = useState([]);
//   // let [divcard,setdivcard]= useState();
//   // let imgs = [{ca :"card mocha"},{ca:"card americano"},{ca:"card cappuccino"},{ca:"card latte"},{ca:"card espresso"}]
//   // setdivcard(imgs);

//   //############### for passing order to db : bid ################
//   // const passingorder = (event) => {
//   //   event.preventDefault();
//   //   const data = new FormData(event.currentTarget);
//   //   const jsonData ={
//   //       Tel: data.get('Tel'),
//   //       password: data.get('password'),
//   //       fname : data.get('firstName'),
//   //       lname : data.get('lastName')
//   // }
//   // fetch("http://localhost:3333/order", {
//   //   method: "POST", // or 'PUT'
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   //   body: JSON.stringify(jsonData),
//   // })
//   //   .then((response) => response.json())
//   //   .then( data => {
//   //     if(data.status === 'ok'){
//   //         alert('register sucess')
//   //     }
//   //     else{
//   //         alert('register failed')
//   //     }
//   //     console.log("Success:", jsonData);
//   //   })
//   //   .catch((error) => {
//   //     console.error("Error:", error);
//   //   });
//   // };

// //########### Button back page ####################
//   const handlelogoutback =(event) =>{
//     event.preventDefault();
//     window.location ='/Album'
// }
  
//   //#############this function for use axios GET !!!!!!!!!##############
//    const fetchData = async () => {
//       const res = await axios('http://localhost:3333/manu/pick');
//         // setData(JSON.stringify(res.data.results))
//         setData(res.data.results)
//         console.log(res.data)
//     };
  

//   useEffect(() => {
//     fetchData();
//   }, []);
//   console.log(datas)

//   return (
//     <>
//       <div>
//         {/* <span>{JSON.stringify(datas)}</span> */}
//         <Box
//           sx={{
//           marginTop: 5,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           }}>
//         <Container component="main" maxWidth="xl">
//           <Box sx={{ flexGrow: 0.5 }}>
//             <Grid container spacing={4} >
//                  <Grid item xs={4} >
//                    <Typography variant="h1" component="h2"> COFFEE</Typography>
//                         <Stack
//                           direction={{ xs: 'column', sm: 'row' }}
//                            spacing={{ xs: 1, sm: 2, md: 4 }}
//                           >
//                           <button className='button-17' style={{
//                              backgroundColor:"green" ,color:"white"}}>
//                             Home </button>
//                           <button className='button-17' >Profile </button>
//                           <button className='button-17' >logout </button>
//                           <button className='button-17' onClick={handlelogoutback}>Back </button>
//                           </Stack>
//                           <br/>
//                           <div >
//                           <div class="article-card">
//                            {/* promotion */}
//                           </div>
//                         </div>
//                     </Grid>
//         {/* {datas.map(employee => { */}
        
//                 <Grid item xs={4} >
//                   <div>
//                     <div class='card s3'> 
//                       <div class='info'>
//                         <h2 class='title'></h2>
//                             {/* <h2>id: {employee.product_id}</h2> */}
//                             <p class='description'>name: </p>
//                             <p class='description'>price:  THB.</p>
//                             <Container fixed>
//                                     <Grid container spacing={1} >
//                                       <Grid item xs={10}> 
//                                           <Stack spacing={1} direction="row">
//                                               <Box component="form" noValidate    sx={{ mt: 1 }}>
//                                                   <Button  variant="contained" 
//                                                           color="success"type="submit"> Buy 
//                                                   </Button> {/* button use for pick */}
//                                               </Box>
//                                           </Stack>
//                                       </Grid>
//                                     </Grid>
//                                   </Container>
//                               </div>
//                           </div>
//                         </div>
//                       </Grid>
                   
//                   {/* })} */}
//                   </Grid>
//                   </Box>
//               </Container>
//             </Box>
//             <br/>
//             <br/>
//         </div> 
        
//    </>
//   );
// }

// // function ASX() {
// //   const [data, setData] = useState(
// //     { });

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const result = await axios(
// //         'http://localhost:3333/manu/pick',
// //       );

// //       setData({
// //         Product_id: result.data.Product_id,
// //         Price: result.data.Price,
// //         Product_id: result.data.Product_id
// //       });
// //     };

// //     fetchData();
// //   }, []);


// //   return (
// //     <ul>
// //       {data.Product_id.map(Product_id => (
// //         <li key={Product_id.id}>
// //           {Product_id.name}
// //         </li>
// //       ))}
// //     </ul>
// //   );
// // }

// // export default ASX;