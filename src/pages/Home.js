import NavBar from '../components/NavBar'
import { Box } from '@mui/material'
import PaymentSuccess from '../components/PaymentSuccess'

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Box sx={{ pt: 20 }}>
        <h6>Home Page</h6>
      </Box>
      <PaymentSuccess />
    </>
  )
}
