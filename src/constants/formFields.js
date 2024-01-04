const loginFields = [
  {
    labelText: 'Email address',
    labelFor: 'email',
    id: 'email',
    name: 'email',
    type: 'text',
    inputProps: { autoComplete: 'email' },
    isRequired: true,
    placeholder: 'Email Address'
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    inputProps: { autoComplete: 'current-password' },
    isRequired: true,
    placeholder: 'Password'
  }
]

const signupFields = [
  {
    labelText: 'First Name',
    labelFor: 'first-name',
    id: 'first-name',
    name: 'first-name',
    type: 'text',
    inputProps: { autoComplete: 'first-name' },
    isRequired: true,
    placeholder: 'First Name'
  },
  {
    labelText: 'Last Name',
    labelFor: 'last-name',
    id: 'last-name',
    name: 'last-name',
    type: 'text',
    inputProps: { autoComplete: 'last-name' },
    isRequired: true,
    placeholder: 'Last Name'
  },
  {
    labelText: 'Email address',
    labelFor: 'email',
    id: 'email',
    name: 'email',
    type: 'text',
    inputProps: { autoComplete: 'email' },
    isRequired: true,
    placeholder: 'Email Address'
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    inputProps: { autoComplete: 'current-password' },
    isRequired: true,
    placeholder: 'Password'
  },
  {
    labelText: 'Confirm Password',
    labelFor: 'confirm-password',
    id: 'confirm-password',
    name: 'confirm-password',
    type: 'password',
    inputProps: { autoComplete: 'current-password' },
    isRequired: true,
    placeholder: 'Confirm Password'
  }
]

export { loginFields, signupFields }
