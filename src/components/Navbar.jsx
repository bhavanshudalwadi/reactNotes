import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { useContext } from 'react';
import noteContext from '../contexts/notes/noteContext';

const Navbar = () => {
  const { token, setToken } = useContext(noteContext)

  const pages = ['Home', 'About'];
  let settings = ['Login', 'SignUp'];
  if(token){
    settings = ['Profile', 'Logout'];
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // useLocation & useNavigate
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(location)
  // }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null)
    navigate('/')
  };

  const handleManuItemClick = (e, index) => {
    if(index === 0){
      navigate('/profile')
    }else if(index === 1){
      handleLogout()
    }
  }

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar alt="react Notes" sx={{display: { xs: 'none', md: 'flex' }, mr: 1}} src="imgs/icon.jpg"/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            reactNotes
          </Typography> {/* reactNotes */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link to={page!='Home'?`/${page.toLowerCase()}`:'/'} key={page}>
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>    {/* Mobile Navbar */}

          <Avatar alt="react Notes" sx={{display: { xs: 'flex', md: 'none' }, mr: 1}} src="./imgs/icon.jpg"/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            reactNotes
          </Typography> {/* reactNotes */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <Link
                    to={page!='Home'?`/${page.toLowerCase()}`:'/'}
                    key={page}
                    onClick={handleCloseNavMenu}
                    style={{display: 'block', marginRight: 20,
                            color: location.pathname==(page!='Home'?`/${page.toLowerCase()}`:'/')?'white':'#ccc'
                          }}
                >
                    <Typography>{page}</Typography>
                </Link>
            ))}
          </Box>    {/* Pc Navbar */}

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }}}>
          {!token?
            <>
              <Link to='/login' style={{marginRight: 5}}>
                <Button variant='text' style={{color: 'white'}}>Login</Button>  
              </Link>
              <Link to='/signup' style={{marginRight: 5}}>
                <Button variant='text' style={{color: 'white'}}>Signup</Button>  
              </Link>
            </>
          :<>
            <Link to='/profile' style={{marginRight: 5}}>
              <Button variant='text' style={{color: 'white'}}>Profile</Button>  
            </Link>
            <Button onClick={handleLogout} style={{color: 'white'}} variant='text'>Logout</Button>
          </>}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <Tooltip title="Open Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>N</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={setting} onClick={(e)=>handleManuItemClick(e, index)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
