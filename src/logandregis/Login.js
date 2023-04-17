import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image from "../Photo/coffee1.png"; 



export default function SignInSide() {
  //################ set ข้อมูล usres #######################
  const [datatel2,setDatatel2] = React.useState()

  const theme = createTheme();

  const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsonData = {
          Tel: data.get('Tel'),
          password: data.get('password'),
        };
// ############## เป็นการทำการยืนยันการ login #################
      fetch("http://localhost:3333/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then( data => {
        if(data.status === 'ok'){
            localStorage.setItem('token', data.token);
            window.location = '/album'
        }
        else{alert('login failed')}
      })
  .catch((error) => {console.error("Error:", error);});

// ############ เป็นส่วนการเก็บข้อมูล login ชั่วคราว ################
    const data2 = new FormData(event.currentTarget);
    const jsonData2 = {
      Tel: data2.get('Tel'),
    };
    fetch("http://localhost:3333/login/datatel", {
  method: "POST", // or 'PUT'
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(jsonData2),
})
  .then((response) => response.json())
  .then( data2 => {
    if(data2.status === 'ok'){
      setDatatel2(JSON.stringify(jsonData2.Tel))
      console.log(datatel2)
    }
    else{alert('login failed')}
    // console.log("Success:", jsonData2);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{ backgroundImage:`url(${image})` }}
          sx={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              marginTop: 25,
              // my: 10,
              // mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
                Log in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Tel"
                id="Tel"
                name="Tel"
                autoComplete="Tel"
                autoFocus
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>

                <Grid item>

                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                  <br/>
                  

                   <Link  href="/loginadmin" variant="body2">
                        {"login for admin and employee"}
                      </Link>
                </Grid><br/>
                
                 
              </Grid> 
             </Box>
            
              
              
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
  
}

// export function colletTel(x){

//     let Tel = x

//     return Tel;
// }