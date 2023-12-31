import React, { useEffect, useState } from 'react'
import ServiceCard from './ServiceCard'
import { Grid, Box } from '@mui/material'
import { getServices } from '../util/api'

export default function ServiceListings() {
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const services = await getServices()
        setServices(services)
      } catch (error) {
        console.error('Error fetching services: ', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Box sx={{ mx: 4, my: 12 }}>
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid key={service.service_id} item xs={12} sm={6} md={3}>
            <ServiceCard service={service} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
