# Lesson Plan

- [ ] Make a global search for the string STEP, there are 10 steps to complete, with instructions in the comments
- [ ] There are three files involved:

  - [ ] `App.js` the brains of the app, holds all state and state-altering callbacks
  - [ ] `FriendForm.js` which receives everything it needs to function from its parent `App.js`
  - [ ] `formSchema.js` where we create our validation schema using Yup

## Steps

1. The very first step is testing out the endpoints shown in the `README.md` file with Postman, cURL or HTTPie
2. Then we complete the `FriendForm.js` following the instructions in that file, demoing radio buttons and checkboxes
3. The we demo building a schema inside `formSchema.js` with Yup
4. Write the imports inside `App.js`
5. Implement a network helper to [GET] friends from the API
6. Implement a network helper to [POST] a new friend to the API
7. Complete the payload for the [POST]
8. Use the [POST] helper
9. Demo updating the disabled state of the submit button using TK as reference
10. Run validation of the individual value inside the change handler
