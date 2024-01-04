import React from 'react'
import NavBar from '../components/NavBar'
import OrderHistory from '../components/OrderHistory'
import { Box, useTheme } from '@mui/material'

export default function OrderHistoryPage({ toggleMode, mode }) {
  const theme = useTheme()

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          backgroundColor: theme.palette.background.paper
        }}
      >
        <NavBar toggleMode={toggleMode} mode={mode} />
        <OrderHistory />
      </Box>
    </>
  )
}
