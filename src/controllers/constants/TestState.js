// Creates Clarifai Authorization and connection to API
const TestState = {
    input: '',
    imageURL: '',
    borderBoxes: [],
    route: 'detect',
    isSignedIn: true,
    // keeps track of current user information
    user: {
      id: '45',
      email: 'test@gmail.com',
      firstName: 'Test',
      lastName: 'Test',
      rank: 0,
      joined: new Date(),
    }
}

module.exports = {
    TestState: TestState
}