import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Snackbar, Alert, AlertTitle, Stack } from '@mui/material'
// import { Alert, AlertTitle } from '@mui/material/Alert'

export default function HomePage() {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const paymentSuccess = query.get('paymentSuccess') === 'true'

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    if (paymentSuccess !== null) {
      handleOpen()
    }
  }, [paymentSuccess])

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Stack sx={{ width: '100%' }} spacing={2}>
          {paymentSuccess ? (
            <Alert
              severity="success"
              variant="filled"
              sx={{ width: '100%', padding: '10px', fontSize: '1em' }}
            >
              <AlertTitle>Success</AlertTitle>
              Payment Successful
            </Alert>
          ) : (
            <Alert
              severity="warning"
              variant="filled"
              sx={{ width: '100%', padding: '5px', fontSize: '1em' }}
            >
              <AlertTitle>Warning</AlertTitle>
              Payment Cancelled
            </Alert>
          )}
        </Stack>
      </Snackbar>
    </>
  )
}
