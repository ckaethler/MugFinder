// Creates Clarifai Authorization and connection to API
const initialState = {
  input: '',
  imageURL: '',
  borderBoxes: [],
  route: 'home',
  isSignedIn: false,
  // keeps track of current user information
  user: {
    id: '',
    email: '',
    firstname: '',
    lastname: '',
    rank: 0,
    joined: new Date(),
  }
}

module.exports = {
    initialState: initialState
}