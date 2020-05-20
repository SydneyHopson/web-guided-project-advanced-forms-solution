import * as yup from 'yup'

const formSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, 'The username must have at least 3 characters')
    .required('Username is required'),
  email: yup
    .string()
    .email('A valid email is required')
    .required('Email is required'),
  role: yup
    .mixed().oneOf(['Student', 'Alumni', 'Instructor', 'TL'], 'Select a valid role')
    .required('A Role is required'),
  civil: yup
    .string()
    .matches(/(Married|Single)/, 'Either single or married')
    .required('Civil status is required'),
})

export default formSchema
