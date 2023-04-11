import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';

export default function Typepage2() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
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
                            <FormControlLabel value="0%" id='' control={<Radio />} label="0" />
                            <FormControlLabel value="25%" control={<Radio />} label="25" />
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
                    {/* <Grid item xs={12}>
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
                    </Grid> */}
                    {/* <Grid item xs={12}>
                            <TextField
                                    fullWidth
                                    id="Tel"
                                    label="Note"
                            />        
                    </Grid> */}
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}