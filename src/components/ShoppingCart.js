import React, { useContext } from 'react'
import { CartContext } from '../util/CartContext'
import ServiceCard from './ServiceCard'
import { Button, Box } from '@mui/material'
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
    <div>
      <Box sx={{ mx: 4, my: 12 }}>
        <Button onClick={removeAllServicesFromCart}>Clear Cart</Button>
        {cart.map((service) => (
          <ServiceCard
            key={service.service_id}
            service={service}
            inCart={true}
          />
        ))}
      </Box>
    </div>
  )
}
