import { Box } from '@mui/material'
import Header from '../components/Header'
import Signup from '../components/Signup'

export default function SignupPage() {
  return (
    <>
      <Box sx={{ pt: 18 }}>
        <Header
          heading="Signup for an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/"
        />
        <Signup />
      </Box>
    </>
  )
}
