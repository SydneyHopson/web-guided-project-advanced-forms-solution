// Here goes the schema for the form
import * as yup from 'yup'

const formSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, "Username must be 3 characters long"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required"),
  role: yup
    .string()
    .oneOf(['instructor', 'student', 'alumni', 'tl'], "Role is required"),
  civil: yup
    .string()
    .oneOf(['married', 'single'], "Civil status is required")
})

export default formSchema
