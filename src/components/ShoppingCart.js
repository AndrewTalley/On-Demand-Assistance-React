import React, { useContext } from 'react'
import { CartContext } from '../util/CartContext'
import ServiceCard from './ServiceCard'
import { Button, Box, Grid, Typography } from '@mui/material'
import { deleteAllUserServices, getUserID } from '../util/api'

export default function ShoppingCartPage() {
  const [cart, setCart] = useContext(CartContext)

  const removeAllServicesFromCart = async () => {
    try {
      const user_id = await getUserID()
      const response = await deleteAllUserServices(user_id)
      if (response.status !== 200) {
        throw new Error('Network response was not ok')
      }
      setCart([])
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
              backgroundColor: '#f5f5f5', // a lighter shade of gray
              width: '100%',
              borderTop: '2px solid #ddd', // add a border at the top
              boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)' // add a shadow
            }}
          >
            <Box sx={{ my: 3 }}>
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
            </Box>
            <Box
              display="flex"
              alignContent={'baseline'}
              sx={{ my: 1, gap: 2 }}
            >
              <Button variant="contained" color="success" size="small">
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
