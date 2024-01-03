import React from 'react'
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
function App() {
  return (
    <OrderProvider>
      <CartProvider>
        <ServicesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/services" element={<ServiceListingsPage />} />
              <Route path="/shopping-cart" element={<ShoppingCartPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/order-history" element={<OrderHistoryPage />} />
            </Routes>
          </Router>
        </ServicesProvider>
      </CartProvider>
    </OrderProvider>
  )
}

export default App
