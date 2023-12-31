import Header from '../components/Header'
import Login from '../components/Login'
import { Box } from '@mui/material'

export default function LoginPage() {
  return (
    <>
      <Box sx={{ pt: 24 }}>
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup"
        />
        <Login />
      </Box>
    </>
  )
}
