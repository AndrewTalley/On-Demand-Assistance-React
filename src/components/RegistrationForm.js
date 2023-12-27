import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Select, MenuItem } from '@mui/material'
import axios from 'axios'

const RegistrationForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const handleRegistration = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/register',
        {
          username,
          password,
          email,
          role
        }
      )

      console.log('Registration Successful: ', response)
    } catch (error) {
      console.error('Registration Failed: ', error)
    }
  }
  const handleChange = (event) => {
    setRole(event.target.value)
  }

  return (
    <div className="max-w-md mx-auto my-8">
      <TextField
        className="w-full mb-4"
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Box mb={2} />
      <TextField
        className="w-full mb-4"
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box mb={2} />
      <TextField
        className="w-full mb-4"
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Box mb={2} />
      <Select className="w-1/2 mb-1" value={role} onChange={handleChange}>
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="user">User</MenuItem>
      </Select>
      <Box mb={1} />
      <Button
        className="w-full"
        variant="contained"
        color="primary"
        onClick={handleRegistration}
      >
        Register
      </Button>
    </div>
  )
}

export default RegistrationForm
