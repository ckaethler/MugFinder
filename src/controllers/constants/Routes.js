const routes = {
  NoAuth: [
    {
      name: 'home',
      display: 'Home'
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
      display: 'Home'
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