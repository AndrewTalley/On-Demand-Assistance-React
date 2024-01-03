import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import {
  getOrdersById,
  deleteOrderById,
  createdOrder,
  getUserID
} from '../util/api'
import { formatDate } from '../util/helper'
import { ServicesContext } from '../context/ServicesContext'

const OK_STATUS = 200

export default function ServiceCard({
  service,
  inCart,
  removeServiceFromNotInCart
}) {
  const { service_id, service_name, service_description, service_price } =
    service
  const [cart, setCart] = useContext(CartContext)
  const { resetServicesNotInCart } = useContext(ServicesContext)

  const removeServiceFromCart = async () => {
    try {
      const orderId = await getOrdersById(service_id, await getUserID())
      const response = await deleteOrderById(orderId)
      if (response.status !== OK_STATUS) {
        throw new Error('Network response was not ok')
      }
      resetServicesNotInCart()
      setCart((prevCart) => prevCart.filter((s) => s.service_id !== service_id))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const addServiceToCart = async () => {
    try {
      await createdOrder(service_id)
      removeServiceFromNotInCart()
      setCart([...cart, service])
    } catch (error) {
      console.error('Failed to select service: ', error)
    }
  }

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: 3,
          borderColor: 'divider'
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="center">
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 'bold' }}
            >
              {service_name}
            </Typography>
          </Box>
          <Box border={1} borderColor="divider" borderRadius={1} p={2} mb={2}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 'bold' }}
              component="div"
            >
              Service Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {service_description}
              <Typography variant="body2" color="text.secondary">
                {formatDate}
              </Typography>
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ fontWeight: 'bold' }}
          >
            <Typography variant="h6" color="text.primary">
              ${service_price}
            </Typography>
            <Box sx={{ pt: 2 }}>
              {inCart ? (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={removeServiceFromCart}
                >
                  Delete from Cart
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={addServiceToCart}
                >
                  Add to Cart
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}
