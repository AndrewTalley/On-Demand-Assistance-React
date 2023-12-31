import axios from 'axios'

// User Authentication Functions
// ------------------------------

// 1.) Registers a new user
export const registerUser = async (
  firstName,
  lastName,
  email,
  password,
  role
) => {
  const response = await axios.post(
    'http://localhost:3000/api/v1/users/register',
    {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      role: role
    },
    { withCredentials: true }
  )
  return response
}

// 2.) Authenticates a user
export const loginUser = async (email, password) => {
  const response = await axios.post(
    'http://localhost:3000/api/v1/users/login',
    {
      email: email,
      password: password
    },
    { withCredentials: true }
  )
  return response
}

// 3.) Logs out the currently authenticated user
export const logoutUser = async () => {
  const response = await axios.post(
    'http://localhost:3000/api/v1/users/logout',
    {},
    { withCredentials: true }
  )
  return response
}

// 4.) Fetches the user ID of the currently authenticated user
export const getUserID = async () => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/transactions/get-user-id`,
    { withCredentials: true }
  )
  return response.data.user_id
}

// Service Related Functions
// --------------------------

// 1.) Fetches all services
export const getServices = async () => {
  const response = await axios.get('http://localhost:3000/api/v1/services')
  return response.data.services
}

// 2.) Fetches a specific service for a user
export const getUserService = async (service_id, user_id) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/transactions/get-user-service/${service_id}/${user_id}`,
    { withCredentials: true }
  )
  return response.data.data.id
}

// 3.) Selects a specific service for a user
export const selectService = async (service_id) => {
  const response = await axios.post(
    `http://localhost:3000/api/v1/transactions/select-service`,
    { service_id },
    { withCredentials: true }
  )
  return response
}

// User Service Related Functions
// -------------------------------

// 1.) Deletes a specific service for a user
export const deleteService = async (userServiceID) => {
  const response = await axios.delete(
    `http://localhost:3000/api/v1/transactions/delete-service/${userServiceID}`,
    { withCredentials: true }
  )
  return response
}

// 2.) Deletes all services for a specific user
export const deleteAllUserServices = async (user_id) => {
  const response = await axios.delete(
    `http://localhost:3000/api/v1/transactions/delete-all-services/${user_id}`,
    { withCredentials: true }
  )
  return response
}
