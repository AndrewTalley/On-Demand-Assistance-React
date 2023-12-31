import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import ServiceListingsPage from './pages/ServiceListings'
import ShoppingCartPage from './pages/ShoppingCart'
import SupportPage from './pages/Support'
import { CartProvider } from './util/CartContext'

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/services" element={<ServiceListingsPage />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
