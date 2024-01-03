import React from 'react'

export const OrderContext = React.createContext()

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = React.useState([])

  return (
    <OrderContext.Provider value={[orders, setOrders]}>
      {children}
    </OrderContext.Provider>
  )
}
