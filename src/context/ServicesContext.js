// /util/ServicesContext.js
import React, { useState, useEffect } from 'react'
import { getServices } from '../util/api'

export const ServicesContext = React.createContext()

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([])
  const [servicesNotInCart, setServicesNotInCart] = useState([])

  useEffect(() => {
    getServices().then((data) => {
      setServices(data)
      setServicesNotInCart(data)
    })
  }, [])

  const resetServicesNotInCart = () => {
    setServicesNotInCart(services)
  }

  const removeServiceFromNotInCart = (service) => {
    setServicesNotInCart((prevServices) =>
      prevServices.filter((s) => s.service_id !== service.service_id)
    )
  }

  return (
    <ServicesContext.Provider
      value={{
        resetServicesNotInCart,
        servicesNotInCart,
        removeServiceFromNotInCart
      }}
    >
      {children}
    </ServicesContext.Provider>
  )
}
