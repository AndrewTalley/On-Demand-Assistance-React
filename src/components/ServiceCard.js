import React, { useContext } from 'react'
import { CartContext } from '../util/CartContext'
import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import {
  getUserService,
  deleteService,
  selectService,
  getUserID
} from '../util/api'
import { formatDate } from '../util/helper'

const OK_STATUS = 200

export default function ServiceCard({ service, inCart }) {
  const { service_id, service_name, service_description, service_price } =
    service
  const [cart, setCart] = useContext(CartContext)

  const removeServiceFromCart = async () => {
    try {
      const userServiceID = await getUserService(service_id, await getUserID())
      const response = await deleteService(userServiceID)
      if (response.status !== OK_STATUS) {
        throw new Error('Network response was not ok')
      }
      setCart((prevCart) => prevCart.filter((s) => s.service_id !== service_id))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const addServiceToCart = async () => {
    try {
      await selectService(service_id)
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
