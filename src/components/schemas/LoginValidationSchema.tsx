import * as Yup from 'yup'

export const LoginForm = {
  formId: 'LoginForm',
  formField: {
    email: {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      requiredErrorMsg: 'Email is required',
    },
    password: {
      name: 'password',
      label: 'Password',
      placeholder: 'Enter Password',
      requiredErrorMsg: 'Password is required',
    },
  },
}

const {
  formField: { email, password },
} = LoginForm

export const LoginValidationSchema = Yup.object({
  email: Yup.string().required(email.requiredErrorMsg),
  password: Yup.string().required(password.requiredErrorMsg),
})
