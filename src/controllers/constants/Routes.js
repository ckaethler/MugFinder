const routes = {
  NoAuth: [
    {
      name: 'home',
      display: 'About'
    },
    {
      name: 'register',
      display: 'Create Account',
    },
    {
      name: 'signin',
      display: 'Sign In'
    },
  ],
  Auth: [
    {
      name: 'home',
      display: 'About'
    },
    {
      name: 'detect',
      display: 'Find Mug'
    },
    {
      name: 'signout',
      display: 'Sign Out'
    },
  ]
};

module.exports = {
    routes: routes
};