// NavBarButton.js
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { styled } from '@mui/system'

const StyledButton = styled(Button)({
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
})

const NavBarButton = ({ to, children }) => (
  <StyledButton color="inherit" component={Link} to={to} sx={{ mx: 2 }}>
    {children}
  </StyledButton>
)

export default NavBarButton
