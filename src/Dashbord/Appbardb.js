import  React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';


export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handledb =(event) =>{
    event.preventDefault();
    window.location ='/Dashborads'
  };
  const handleorderdb =(event) =>{
    event.preventDefault();
    window.location ='/Orderdb'
  };

  const handleUserdb =(event) =>{
    event.preventDefault();
    window.location ='/Userdb'
  };

  const handleAccountdb =(event) =>{
    event.preventDefault();
    window.location ='/Accountdb'
  };

  const handleManudb =(event) =>{
    event.preventDefault();
    window.location ='/Manudb'
  };

  const handleStockdb =(event) =>{
    event.preventDefault();
    window.location ='/Stockdb'
  };

 
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <List>
     
        <Stack spacing={2}> 
        <ListItemButton onClick={handledb}>
          <ListItemIcon>
              <InboxIcon />
          </ListItemIcon>
          <ListItemText >Dashboard</ListItemText>
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={handleorderdb}>
          <ListItemIcon>
              <InboxIcon />
          </ListItemIcon>
          <ListItemText >Order</ListItemText>
        </ListItemButton>

        <ListItemButton onClick={handleUserdb}>
        <ListItemIcon>
              <InboxIcon />
          </ListItemIcon>
        <ListItemText >User</ListItemText>
        </ListItemButton>

        <ListItemButton onClick={handleAccountdb}>
        <ListItemIcon>
              <InboxIcon />
          </ListItemIcon>
        <ListItemText>Accounting</ListItemText>
        </ListItemButton>

        <ListItemButton onClick={handleManudb}>
        <ListItemIcon>
              <InboxIcon />
          </ListItemIcon>
        <ListItemText>Menu</ListItemText>
        </ListItemButton>

        {/* <ListItemButton onClick={handleStockdb}>
        <ListItemIcon>
              <InboxIcon />
          </ListItemIcon>
        <ListItemText>Stock</ListItemText>
        </ListItemButton> */}
        </Stack>
        
    </List>
    </Box>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
                {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(anchor, true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Admin Dashboard
                    </Typography>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                    </React.Fragment>
                ))} 
                </Toolbar>
                </AppBar>
    </div>
  );
}
