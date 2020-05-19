import React, { useState, useEffect } from 'react'
import Friend from './Friend'
import FriendForm from './FriendForm'
import axios from 'axios'

// 👉 [GET] request to `http://localhost:4000`
const responseBody = [
  {
    // 👉 the shape of each actual friend object from API
    id: 'xyz',
    username: 'Michael',
    email: 'michael@michael.com',
    role: 'Student',
    civil: 'Single',
    hobbies: [
      'hiking',
      'reading',
      'coding',
    ],
  },
]

// 👉 the shape of the state that drives the form
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

export default function App() {
  const [friends, setFriends] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)

  useEffect(() => {
    axios.get('http://localhost:4000/friends')
      .then(res => {
        setFriends(res.data)
      })
      .catch(err => {
        debugger
      })
  }, [])

  const onInputChange = evt => {
    // a) pull the name of the input from the event object
    const name = evt.target.name // either 'username' or 'email'
    // b) pull the value of the input from the event object
    const value = evt.target.value // who knows, the current value
    // c) set a new state for the whole form

    setFormValues({
      // copy over all the properties from formValues
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const onCheckboxChange = evt => {
    // a) pull the name of the checkbox from the event
    const { name } = evt.target
    // b) pull whether checked true or false, from the event
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
    // b) make a new friend object with an id, GROSS
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
    axios.post('http://localhost:4000/friends', newFriend)
      .then(res => {
        // d) update the list of friends in state with the new friend
        setFriends([res.data, ...friends])
      })
      .catch(err => {
        debugger
      })
      .finally(() => {
        // e) clear the form
        setFormValues(initialFormValues)
      })
  }

  return (
    <div className='container'>
      <header><h1>Friends App</h1></header>

      <FriendForm
        // 🔥 STEP 2 - THE FORM WANTS ITS FOOD!!!!
        // check implementation of FriendForm
        // to see what props it expects
        values={formValues}
        onInputChange={onInputChange}
        onCheckboxChange={onCheckboxChange}
        onSubmit={onSubmit}
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
