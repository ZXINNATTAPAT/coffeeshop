import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


export default function Espresso() {
  return (
    <>
        <div>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography component="h1" variant="h5">
          Coffee Type
        </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            {/* Radio from */}
                <Grid item xs={12}>

                <FormLabel id="demo-row-radio-buttons-group-label">
                sweetness(%)
                </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                            <FormControlLabel value="female" control={<Radio />} label="0" />
                            <FormControlLabel value="male" control={<Radio />} label="25" />
                            <FormControlLabel value="50%" control={<Radio />} label="50" />
                            <FormControlLabel value="75%" control={<Radio />} label="75" />
                            <FormControlLabel value="100%" control={<Radio />} label="100" />
                    </RadioGroup>
                
                </Grid>
                    <Grid item xs={12}>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                            Coffee type
                        </FormLabel>
                            <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                            <FormControlLabel value="female" control={<Radio />} label="Hot" />
                                            <FormControlLabel value="male" control={<Radio />} label="Ice" />
                                            <FormControlLabel value="other" control={<Radio />} label="Mix" />

                                    </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                            Add coffee shot
                        </FormLabel>
                            <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                            <FormControlLabel value="female" control={<Radio />} label="One shot" />
                                    </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                            Size
                        </FormLabel>
                            <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                            <FormControlLabel value="female" control={<Radio />} label="Middle" />
                                            <FormControlLabel value="male" control={<Radio />} label="Large" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                            <TextField
                                    fullWidth
                                    id="Tel"
                                    label="Note"
                            />        
                    </Grid>
                    <Grid item xs={12}>
                    <Stack spacing={2} direction="row">
                        <Button
                            
                            fullWidth
                            variant="outlined"
                            color="error"
                            href="/Coffee" 
                        >
                        Cancel
                        </Button>
                        <Button
                            
                            fullWidth
                            variant="contained"
                            color="success"
                        >
                        Buy
                        </Button>
                    </Stack>
                  </Grid>
              </Grid>
          </Box>
        </Box>
       
      </Container>
        </div>
    </>
  )
}
