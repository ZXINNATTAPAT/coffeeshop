import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
// import image from "../Photo/coffee1.png"; 


export default function Loginadmin() {

//   const [datatel,setDatatel] = React.useState()
//   const [datatel2,setDatatel2] = React.useState()

  const theme = createTheme();

  const handleSubmit = (event) => {

    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const jsonData = {
      usersname: data.get('usersname'),
      password: data.get('password'),
    };

    fetch("http://localhost:3333/login/admin", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
            })
            .then((response) => response.json())
            .then( data => {
                if(data.status === 'ok'){
                    localStorage.setItem('token',data.token)
                    // setDatatel(JSON.stringify(jsonData))
                    // colletTel(datatel)
                    window.location = '/Dashboards'
                    // alert('login sucess')
                }
                else{
                    alert('login failed')
                }
                console.log("Success:", jsonData);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

//     const data2 = new FormData(event.currentTarget);
//     const jsonData2 = {
//       Tel: data2.get('Tel'),
//     };

//     fetch("http://localhost:3333/login/datatel", {
//   method: "POST", // or 'PUT'
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(jsonData2),
// })
//   .then((response) => response.json())
//   .then( data2 => {
//     if(data2.status === 'ok'){
//       setDatatel2(JSON.stringify(jsonData2.Tel))
//       console.log(datatel2)
//     }
//     else{
//         alert('login failed')
//         console.log(jsonData2)
//     }
//     console.log("Success:", jsonData2);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
  };

  return (
    <ThemeProvider theme={theme}>
        <Container  maxWidth="sm">
            <Box  
                sx={{
                    width: '100%',
                }}
                >
                <Grid container component="main" 
                    className='card' 
                    sx={{ marginTop: 18 }}>
                    <Box
                        sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Login Admin and employee
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="usersname"
                            id="usersname"
                            name="usersname"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            sing in
                        </Button>

                        </Box>
                    </Box>
                
                </Grid>
                
            </Box>

      </Container>

    </ThemeProvider>
  );
}

// export function colletTel(x){

//     let Tel = x

//     return Tel;
// }