import { useState } from 'react'
import { loginFields } from '../constants/formFields'
import Input from './Input'
import FormExtra from './FormExtra'
import FormAction from './FormAction'
import axios from 'axios'

const fields = loginFields
let fieldsState = {}
fields.forEach((field) => (fieldsState[field.id] = ''))

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState)

  const handleChange = (e) => {
    setLoginState({
      ...loginState,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await authenticateUser()
  }

  // Handle Login API Integration Here
  const authenticateUser = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/login',
        {
          email: loginState['email'],
          password: loginState['password']
        }
      )

      console.log('Login Successful: ', response)
    } catch (error) {
      console.error('Login Failed: ', error)
    }
  }

  return (
    <form className="mt-8 space-y-6">
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <div className="mt-2 space-y-5">
          <FormExtra />
          <FormAction handleSubmit={handleSubmit} text={'Login'} />
        </div>
      </div>
    </form>
  )
}
