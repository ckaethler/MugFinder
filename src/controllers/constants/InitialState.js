// Creates Clarifai Authorization and connection to API
const initialState = {
    input: '',
    imageURL: '',
    borderBoxes: [],
    route: 'signin',
    isSignedIn: false,
    // keeps track of current user information
    user: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      rank: 0,
      joined: new Date(),
    }
}

module.exports = {
    initialState: initialState
}