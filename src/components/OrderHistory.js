import React, { useContext, useEffect } from 'react'
import { OrderContext } from '../context/OrdersContext'
import { getAllUserOrders, getUserID } from '../util/api'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

export default function OrderHistory() {
  const [orders, setOrders] = useContext(OrderContext)

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const user_id = await getUserID()
        const response = await getAllUserOrders(user_id)
        if (response.status !== 'success') {
          throw new Error('Network response was not ok')
        }
        setOrders(response.orders)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchOrderHistory()
  }, [setOrders])

  return (
    <TableContainer component={Paper} sx={{ mt: '70px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="right">ServiceID</TableCell>
            <TableCell align="right">UserId</TableCell>
            <TableCell align="right">SessionId</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders &&
            orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell align="right">{order.service_id}</TableCell>
                <TableCell align="right">{order.user_id}</TableCell>
                <TableCell align="right">{order.sid}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
