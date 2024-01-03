import axios from 'axios'

// Base URL for the API
const BASE_URL = 'http://localhost:3000/api/v1'

// User API Endpoints
// ---------------------------------

// Registers a new user
export const registerUser = async (
  firstName,
  lastName,
  email,
  password,
  role
) => {
  const response = await axios.post(
    `${BASE_URL}/users/register`,
    { first_name: firstName, last_name: lastName, email, password, role },
    { withCredentials: true }
  )
  return response
}

// Authenticates a user
export const loginUser = async (email, password) => {
  const response = await axios.post(
    `${BASE_URL}/users/login`,
    { email, password },
    { withCredentials: true }
  )
  return response
}

// Logs out the currently authenticated user
export const logoutUser = async () => {
  const response = await axios.post(
    `${BASE_URL}/users/logout`,
    {},
    { withCredentials: true }
  )
  return response
}

// Fetches the user ID of the currently authenticated user
export const getUserID = async () => {
  const response = await axios.get(`${BASE_URL}/users/sessionid`, {
    withCredentials: true
  })
  return response.data.user_id
}

// Service API Endpoints
// ----------------------

// Fetches all services
export const getServices = async () => {
  const response = await axios.get(`${BASE_URL}/services`)
  return response.data.services
}

// Order API Endpoints
// ---------------------------

// Fetches all the orders for a user by the user's ID
export const getAllUserOrders = async (userId) => {
  const response = await axios.get(`${BASE_URL}/orders/${userId}`, {
    withCredentials: true
  })
  return response.data
}

// Fetches a specific Order for a user
export const getOrdersById = async (service_id, user_id, sid) => {
  const response = await axios.get(
    `${BASE_URL}/orders/find-user-order/${service_id}/${user_id}/${sid}`,
    { withCredentials: true }
  )
  return response.data.data.id
}

// Creates an Order of a user
export const createdOrder = async (service_id) => {
  const response = await axios.post(
    `${BASE_URL}/orders`,
    { service_id },
    { withCredentials: true }
  )
  return response
}

// Deletes a specific Order for a user
export const deleteOrderById = async (orderId) => {
  const response = await axios.delete(`${BASE_URL}/orders/${orderId}`, {
    withCredentials: true
  })
  return response
}

// Deletes all Orders for a specific user
export const deleteAllUserOrders = async (userId) => {
  const response = await axios.delete(
    `${BASE_URL}/orders/${userId}/all-orders`,
    { withCredentials: true }
  )
  return response
}

// Transaction API Endpoints
// --------------------------

// Creates a Stripe checkout session
export const createStripeCheckoutSession = async () => {
  const response = await axios.post(
    `${BASE_URL}/transactions/create-checkout-session`,
    {},
    { withCredentials: true }
  )
  return response
}
