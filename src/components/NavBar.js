// NavBar.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/honeydew-align-left.png'
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Box } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router-dom' // Assuming you are using React Router
import NavBarButton from './NavBarButton'
import { logoutUser } from '../util/api'

export default function NavBar() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      const response = await logoutUser()
      console.log('Logout Successful: ', response)
      navigate('/')
    } catch (error) {
      console.error('Logout Failed: ', error)
    }
    handleClose()
  }

  const navButtons = [
    { to: '/services', label: 'Service Listings' },
    { to: '/shopping-cart', label: 'Shopping Cart' },
    { to: '/support', label: 'Support and Help Center' }
  ]

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ width: '100%' }}
        >
          <img
            src={logo}
            alt="app logo"
            onClick={() => navigate('/home')}
            style={{ maxHeight: '50px' }}
          />
          <Box display="flex" flex={1}>
            {navButtons.map((button) => (
              <NavBarButton key={button.to} to={button.to}>
                {button.label}
              </NavBarButton>
            ))}
          </Box>
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
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/user-profile" onClick={handleClose}>
              User Profile
            </MenuItem>
            <MenuItem
              component={Link}
              to="/order-history"
              onClick={handleClose}
            >
              Order History
            </MenuItem>
            <MenuItem
              component={Link}
              to="/notifications"
              onClick={handleClose}
            >
              Notifications
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
