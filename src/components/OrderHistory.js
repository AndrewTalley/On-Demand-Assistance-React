import React, { useContext, useEffect } from 'react'
import { OrderContext } from '../context/OrdersContext'
import { getAllUserOrders, getUserID } from '../util/api'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import {
  Table,
  TableBody,
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
        console.log(response)
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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#e3e3e3',
      color: theme.palette.common.white
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }))

  return (
    <TableContainer component={Paper} sx={{ mt: '90px' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Service Name</StyledTableCell>
            <StyledTableCell align="right">Service Price</StyledTableCell>
            <StyledTableCell align="right">Service Description</StyledTableCell>
            <StyledTableCell align="right">Order Number</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders &&
            orders.map((order) => (
              <StyledTableRow key={order.id}>
                <StyledTableCell component="th" scope="row">
                  {`${order.user.first_name} ${order.user.last_name}`}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {order.service.service_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {order.service.service_price}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {order.service.service_description}
                </StyledTableCell>
                <StyledTableCell align="right">{order.id}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
