import NavBar from '../components/NavBar'
import { Box, useTheme } from '@mui/material'

export default function SupportPage({ toggleMode, mode }) {
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
      </Box>
    </>
  )
}
