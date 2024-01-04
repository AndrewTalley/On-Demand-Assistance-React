// NavBar.js
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../icons/honeydew-icon-only-white.png'
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Drawer,
  Button,
  Container,
  Typography,
  useTheme,
  Switch
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom' // Assuming you are using React Router
import { logoutUser } from '../util/api'
import ShoppingCart from './ShoppingCart'
import { CartContext } from '../context/CartContext'
import { deleteAllUserOrders, getUserID } from '../util/api'
import { jwtDecode } from 'jwt-decode'

export default function NavBar({ toggleMode, mode }) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [cart, setCart] = useContext(CartContext)
  const [cartOpen, setCartOpen] = useState(false)
  const open = Boolean(anchorEl)

  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  const userRole = decodedToken.role

  const theme = useTheme()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCartOpen = () => {
    setCartOpen(true)
  }

  const handleCartClose = () => {
    setCartOpen(false)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      const user_id = await getUserID()
      if (cart.length > 0) {
        await deleteAllUserOrders(user_id)
      }
      const response = await logoutUser()
      console.log('Logout Successful: ', response)
      setCart([])
      navigate('/')
    } catch (error) {
      console.error('Logout Failed: ', error)
    }
    handleClose()
  }

  const userNavButtons = [
    { to: '/services', label: 'Service Listings' },
    { to: '/support', label: 'Support and Help Center' }
  ]

  const providerNavButtons = [
    { to: '/create-service', label: 'Create New Service' }
  ]

  const userMenuItems = [
    { to: '/user-profile', label: 'User Profile' },
    { to: '/order-history', label: 'Order History' },
    { to: '/notifications', label: 'Notifications' }
  ]

  const providerMenuItems = [
    { to: '/provider-profile', label: 'Provider Profile' },
    { to: '/service-history', label: 'Service History' },
    { to: '/notifications', label: 'Notifications' }
  ]

  const navButtons = userRole === 'user' ? userNavButtons : providerNavButtons
  const menuItems = userRole === 'user' ? userMenuItems : providerMenuItems

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={logo}
            alt="app logo"
            onClick={() => navigate('/home')}
            style={{ maxHeight: '40px', marginRight: '10px' }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: '1.5rem',
              letterSpacing: '.4rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            HoneyDew
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {navButtons.map((button) => (
              <Button
                key={button.to}
                to={button.to}
                component={Link}
                sx={{
                  my: 1,
                  pl: '40px',
                  color: 'white',
                  display: 'block',
                  fontWeight: 500
                }}
              >
                {button.label}
              </Button>
            ))}
          </Box>
          <Switch
            checked={mode === 'dark'}
            onChange={toggleMode}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <IconButton
            color="inherit"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleCartOpen}
          >
            <ShoppingCartIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={cartOpen} // change this to control when the drawer is open
            onClose={handleCartClose}
            PaperProps={{
              sx: {
                width: 500, // adjust this to control the width of the drawer
                backgroundColor: theme.palette.background.paper,
                borderRadius: 0
              }
            }}
          >
            <ShoppingCart />
          </Drawer>
          <IconButton
            color="inherit"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={open}
            onClose={handleClose}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.to}
                to={item.to}
                component={Link}
                onClick={handleClose}
              >
                <Typography textAlign="center">{item.label}</Typography>
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>{' '}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
