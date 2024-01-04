import NavBar from '../components/NavBar'
import { Box } from '@mui/material'
import PaymentSuccess from '../components/PaymentSuccess'
import { useTheme } from '@mui/material'

export default function HomePage({ toggleMode, mode }) {
  const theme = useTheme()
  return (
    <Box
      sx={{ height: '100vh', backgroundColor: theme.palette.background.paper }}
    >
      <NavBar toggleMode={toggleMode} mode={mode} />
      <h6>Home Page</h6>
      <PaymentSuccess />
    </Box>
  )
}
