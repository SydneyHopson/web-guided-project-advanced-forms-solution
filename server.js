const express = require('express')
const uuid = require('uuid').v4
const cors = require('cors')
const app = express()

const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

const friends = [
  {
    id: uuid(),
    username: 'Michael',
    email: 'michael@michael.com',
    married: true,
    hobbies: [
      'hiking',
      'reading',
      'coding'
    ]
  },
]

app.get('/friends/:id', (req, res) => {
  const friend = friends.find(fr => fr.id === req.params.id)
  if (!friend) {
    res.status(404).json({ message: 'No such friend!' })
  }
  else {
    setTimeout(() => {
      res.json(friend)
    }, 500)
  }
})

app.get('/friends', (req, res) => {
  setTimeout(() => {
    res.json(friends)
  }, 500);
})

app.post('/friends', (req, res) => {
  const newFriend = { id: uuid(), ...req.body }
  friends.push(newFriend)
  setTimeout(() => {
    res.status(200).json(newFriend)
  }, 500);
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
