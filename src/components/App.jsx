import React, { useState, useEffect } from 'react'
import Friend from './Friend'
import FriendForm from './FriendForm'
// 🔥 IMPORT THE SCHEMA, AXIOS AND YUP
import formSchema from '../validation/formSchema'
import axios from 'axios'
import * as yup from 'yup'

//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
const initialFormValues = {
  ///// TEXT INPUTS /////
  username: '',
  email: '',
  ///// DROPDOWN /////
  role: '',
  ///// RADIO BUTTONS /////
  civil: '',
  ///// CHECKBOXES /////
  hobbies: {
    hiking: false,
    reading: false,
    coding: false,
  },
}
const initialFormErrors = {
  username: '',
  email: '',
  role: '',
  civil: '',
}
const initialFriends = []
const initialDisabled = true


export default function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [formValues, setFormValues] = useState(initialFormValues)
  // 🔥 SET UP STATE FOR `formErrors` AND `disabled`
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  const getFriends = () =>
    // 🔥 IMPLEMENT! ON SUCCESS PUT FRIENDS IN STATE
    //    helper to [GET] all friends from `http://localhost:4000/friends`
    axios.get('http://localhost:4000/friends')
      .then(res => {
        setFriends(res.data)
      })
      .catch(err => {
        debugger
      })

  const postNewFriend = newFriend =>
    // 🔥 IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
    //    helper to [POST] `newFriend` to `http://localhost:4000/friends`
    //    and regardless of success or failure, the form should reset
    axios.post('http://localhost:4000/friends', newFriend)
      .then(res => {
        setFriends([res.data, ...friends])
        // or trigger `getFriends`
      })
      .catch(err => {
        debugger
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })

  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  const onInputChange = evt => {
    const name = evt.target.name
    const value = evt.target.value

    // 🔥 RUN VALIDATION WITH YUP
    yup.reach(formSchema, name)
      .validate(value)
      .then(valid => {
        // the value validates, clear error
        setFormErrors({
          ...formErrors,
          [name]: '',
        })
      })
      .catch(err => {
        // the value does not validate, set an error
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })

    // d) set a new state for the whole form
    setFormValues({
      // copy over all the properties from formValues
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const onCheckboxChange = evt => {
    // 🔥 IMPLEMENT!
    // a) pull the `name` of the checkbox from the event
    const { name } = evt.target
    // b) pull whether `checked` true or false, from the event
    const isChecked = evt.target.checked
    // c) set a new state for the whole form
    setFormValues({
      ...formValues,
      hobbies: {
        ...formValues.hobbies,
        [name]: isChecked,
      }
    })
  }

  const onSubmit = evt => {
    evt.preventDefault()

    const newFriend = {
      username: formValues.username,
      email: formValues.email,
      role: formValues.role,
      civil: formValues.civil,
      // 🔥 WHAT ABOUT HOBBIES?
      hobbies: Object.keys(formValues.hobbies)
        .filter(hobby => formValues.hobbies[hobby] === true)
    }
    // 🔥 POST NEW FRIEND USING HELPER
    postNewFriend(newFriend)
  }

  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  useEffect(() => {
    // 🔥 GET FRIENDS USING HELPER
    getFriends()
  }, [])

  useEffect(() => {
    // 🔥 ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>Friends App</h1></header>

      <FriendForm
        values={formValues}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        // 🔥 ADDITIONAL PROPS NEEDED
        onCheckboxChange={onCheckboxChange}
        errors={formErrors}
        disabled={disabled}
      />

      {
        friends.map(friend => {
          return (
            <Friend key={friend.id} details={friend} />
          )
        })
      }
    </div>
  )
}
