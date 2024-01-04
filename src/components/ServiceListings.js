import React, { useContext } from 'react'
import ServiceCard from './ServiceCard'
import { Grid, Box } from '@mui/material'
import { ServicesContext } from '../context/ServicesContext'
// import { TransitionContext } from '../context/TransitionContext'

export default function ServiceListings() {
  const { servicesNotInCart, removeServiceFromNotInCart } =
    useContext(ServicesContext)
  return (
    <Box sx={{ mx: 4, my: 12 }}>
      <Grid container spacing={3} direction="row">
        {servicesNotInCart.map((service) => (
          <Grid key={service.service_id} item xs={12} sm={6} md={3}>
            <ServiceCard
              service={service}
              removeServiceFromNotInCart={() =>
                removeServiceFromNotInCart(service)
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
