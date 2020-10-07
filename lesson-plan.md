# Lesson Plan

## Setup

* This project is more complicated for students to spin up because it has a server piece and an extra script (see README)!
* If their port 4000 is being used by something else, running `npm run server` will throw an "address in use" error.
* Fkill CLI is a good tool for dealing with this:
  * Install globally by `npm i -g fkill-cli`
  * Kill process hogging port 4000 by running `fkill :4000`

## Form Demo with Checkboxes and Validation

* Inside the `design-files` folder find the designs, walk students through them.
* There are several steps in different files to complete this guided project.
* Use the global search with the search term `🔥 STEP` to find the steps throughout the codebase.
* Starting at `🔥 STEP 1` follow the instructions in the comments.
* The project is split into several files (allow students time to study each new file that has code):

  * `App.js` is the brain of the app, holding state and state-altering callbacks (one of many possible architectures)
  * `FriendForm.js` receives everything it needs to do its job from its parent `App.js` through props
  * `formSchema.js` is where we create our validation schema using Yup

### Sumary of the 🔥 STEPs

1. The very first step is testing out the endpoints shown in the `README.md` file using Postman, cURL or HTTPie
2. Then we complete the `FriendForm.js` following the instructions in that file, demoing radio buttons and checkboxes
3. Then we demo building a schema inside `formSchema.js` with Yup
4. Write the imports inside `App.js`
5. Implement a network helper to [GET] friends from the API
6. Implement a network helper to [POST] a new friend to the API
7. Complete the payload for the [POST]
8. Use the [POST] helper
9. Update the submit button's state by verifying the whole form against the schema inside an effect hook
10. Run validation of the individual value inside the change handler

## Following Along and Catching Up

* The instructor should make sure students clone the starter repo without forking it.
* The instructor must make commits to a `lecture` branch and push them regularly (or use a script to do it).
* If the students work on their own named branch, `main` is kept clean so they can re-do the demo later.
* In order to catch up, the students can reset their branch to the instructor's last pushed commit:

  ```bash
    git fetch && git reset --hard origin/lecture
  ```
