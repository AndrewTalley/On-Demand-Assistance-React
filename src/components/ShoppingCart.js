import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import ServiceCard from './ServiceCard'
import { Button, Box, Grid, Typography } from '@mui/material'
import {
  deleteAllUserOrders,
  getUserID,
  createStripeCheckoutSession
} from '../util/api'
import { loadStripe } from '@stripe/stripe-js'
import { ServicesContext } from '../context/ServicesContext'

export default function ShoppingCart() {
  const [cart, setCart] = useContext(CartContext)
  const { resetServicesNotInCart } = useContext(ServicesContext)

  const removeAllServicesFromCart = async () => {
    try {
      const user_id = await getUserID()
      const response = await deleteAllUserOrders(user_id)
      if (response.status !== 200) {
        throw new Error('Network response was not ok')
      }
      resetServicesNotInCart()
      setCart([])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
  const handleCheckout = async () => {
    try {
      const response = await createStripeCheckoutSession()
      console.log(response.data.sessionId)
      const session = response.data
      const stripe = await stripePromise
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId
      })
      if (result.error) {
        alert(result.error.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Box sx={{ mx: 4, my: 4 }}>
      {cart.length > 0 ? (
        <>
          <Grid container direction="column" spacing={3} sx={{ pt: 4 }}>
            {cart.map((service) => (
              <Grid item xs={12} sm={6} md={3} key={service.service_id}>
                <ServiceCard service={service} inCart={true} />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              position: 'sticky',
              bottom: 0,
              width: '100%',
              borderTop: '2px solid #ddd', // add a border at the top
              boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)' // add a shadow
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                pt: '10px',
                gap: '30px'
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Total: $
                {cart
                  .reduce(
                    (total, service) =>
                      total + parseFloat(service.service_price),
                    0
                  )
                  .toFixed(2)}
              </Typography>

              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={removeAllServicesFromCart}
              >
                Clear Cart
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty.
        </Typography>
      )}
    </Box>
  )
}
