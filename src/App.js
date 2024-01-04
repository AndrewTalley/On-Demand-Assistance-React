import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import ServiceListingsPage from './pages/ServiceListings'
import ShoppingCartPage from './pages/ShoppingCart'
import SupportPage from './pages/Support'
import OrderHistoryPage from './pages/OrderHistory'
import { CartProvider } from './context/CartContext'
import { ServicesProvider } from './context/ServicesContext'
import { OrderProvider } from './context/OrdersContext'
import { ThemeProvider } from '@mui/material/styles'
import getTheme from './themes/index'
import { useMediaQuery } from '@mui/material'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light')

  const theme = getTheme(mode)

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeProvider theme={theme}>
      <OrderProvider>
        <CartProvider>
          <ServicesProvider>
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={<LoginPage toggleMode={toggleMode} mode={mode} />}
                />
                <Route
                  path="/signup"
                  element={<SignupPage toggleMode={toggleMode} mode={mode} />}
                />
                <Route
                  path="/home"
                  element={<HomePage toggleMode={toggleMode} mode={mode} />}
                />
                <Route
                  path="/services"
                  element={
                    <ServiceListingsPage toggleMode={toggleMode} mode={mode} />
                  }
                />
                <Route
                  path="/shopping-cart"
                  element={
                    <ShoppingCartPage toggleMode={toggleMode} mode={mode} />
                  }
                />
                <Route
                  path="/support"
                  element={<SupportPage toggleMode={toggleMode} mode={mode} />}
                />
                <Route
                  path="/order-history"
                  element={
                    <OrderHistoryPage toggleMode={toggleMode} mode={mode} />
                  }
                />
              </Routes>
            </Router>
          </ServicesProvider>
        </CartProvider>
      </OrderProvider>
    </ThemeProvider>
  )
}

export default App
