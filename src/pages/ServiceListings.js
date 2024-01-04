import NavBar from '../components/NavBar'
import ServiceListings from '../components/ServiceListings'
import { Box, useTheme } from '@mui/material'

export default function ServiceListingsPage({ toggleMode, mode }) {
  const theme = useTheme()

  return (
    <Box
      sx={{ height: '100vh', backgroundColor: theme.palette.background.paper }}
    >
      <NavBar toggleMode={toggleMode} mode={mode} />
      <ServiceListings />
    </Box>
  )
}
