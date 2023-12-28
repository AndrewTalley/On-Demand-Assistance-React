import { useState } from 'react'
import { signupFields } from '../constants/formFields'
import FormAction from './FormAction'
import Input from './Input'
import axios from 'axios'
import { Select, MenuItem } from '@mui/material'

const fields = signupFields
let fieldsState = {}
fields.forEach((field) => (fieldsState[field.id] = ''))

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState)
  const [role, setRole] = useState('')

  const handleChange = (e) => {
    setSignupState({
      ...signupState,
      [e.target.id]: e.target.value
    })
    setRole(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser()
  }

  // Handle Signup API Integration Here
  const registerUser = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/register',
        {
          first_name: signupState['first-name'],
          last_name: signupState['last-name'],
          email: signupState['email'],
          password: signupState['password'],
          role: role
        }
      )

      console.log('Registration Successful: ', response)
    } catch (error) {
      console.error('Registration Failed: ', error)
    }
  }

  return (
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
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
        <FormAction handleSubmit={handleSubmit} text={'Sign Up'} />
      </div>
    </form>
  )
}
