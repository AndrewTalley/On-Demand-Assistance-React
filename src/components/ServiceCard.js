import React, { useContext } from 'react'
import { CartContext } from '../util/CartContext'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardActions
} from '@mui/material'
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
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {service_name}
          </Typography>
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
          <Typography variant="h6" color="text.primary">
            ${service_price}
          </Typography>
          <Box sx={{ pt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={addServiceToCart}
            >
              Select Service
            </Button>
          </Box>
        </CardContent>
        <CardActions>
          {inCart && <Button onClick={removeServiceFromCart}>X</Button>}
        </CardActions>
      </Card>
    </>
  )
}
