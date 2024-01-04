import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupFields } from '../constants/formFields'
import FormAction from './FormAction'
import Input from './Input'
import { Select, MenuItem, Container } from '@mui/material'
import { registerUser } from '../util/api'

const fields = signupFields
let fieldsState = {}
fields.forEach((field) => (fieldsState[field.id] = ''))

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState)
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setSignupState({
      ...signupState,
      [e.target.id]: e.target.value
    })
    setRole(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await registerUser(
      signupState['first-name'],
      signupState['last-name'],
      signupState['email'],
      signupState['password'],
      role
    )
    navigate('/')
  }

  return (
    <Container maxWidth="sm">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <Select
            className="rounded-md appearance-none relative block w-full h-12 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black-500 focus:border-black-500 focus:z-10 sm:text-sm"
            value={role}
            onChange={handleChange}
          >
            <MenuItem value="provider">Provider</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
          <FormAction handleSubmit={handleSubmit} text={'Sign Up'} />
        </div>
      </form>
    </Container>
  )
}
