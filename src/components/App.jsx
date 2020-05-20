import React, { useState, useEffect } from 'react'
import Friend from './Friend'
import FriendForm from './FriendForm'
import formSchema from '../validation/formSchema'
import axios from 'axios'
import * as yup from 'yup'

//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
// 👉 formValues
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
// 👉 formErrors
const initialFormErrors = {
  username: '',
  email: '',
  role: '',
  civil: '',
}
// 👉 friends
const initialFriends = []
// 👉 disabled
const initialDisabled = true

export default function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  // 👉 helper to [GET] all friends from `http://localhost:4000/friends`
  const getFriends = () =>
    axios.get('http://localhost:4000/friends')
      .then(res => {
        setFriends(res.data)
      })
      .catch(err => {
        debugger
      })

  // 👉 helper to [POST] new friend to `http://localhost:4000/friends`
  const postNewFriend = newFriend =>
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
    // a) pull the `name` of the input from the event object
    const name = evt.target.name // either 'username' or 'email'
    // b) pull the `value` of the input from the event object
    const value = evt.target.value // who knows, the current value
    // c) run validation on the `value`
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
    // a) don't allow the browser to reload!
    evt.preventDefault()
    // b) make a new friend object, and
    //    set up the new friend with the correct attributes
    //    using the information inside the state of the form
    const newFriend = {
      username: formValues.username,
      email: formValues.email,
      role: formValues.role,
      civil: formValues.civil,
      hobbies: Object.keys(formValues.hobbies)
        .filter(hobby => formValues.hobbies[hobby] === true)
    }
    // c) POST the new friend
    postNewFriend(newFriend)
  }

  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////

  useEffect(() => {
    getFriends()
  }, [])

  useEffect(() => {
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
        onCheckboxChange={onCheckboxChange}
        onSubmit={onSubmit}
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
