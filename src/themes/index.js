import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = (mode) =>
  createTheme({
    palette: {
      mode: mode // Switching the dark mode on
    }
  })

export default theme
