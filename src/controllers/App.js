import React from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Splash from '../components/Splash/Splash';
import Footer from '../components/Footer/Footer';

const { routes } = require('./constants/Routes');
const { initialState } = require('./constants/InitialState');
// const { TestState } = require('./constants/TestState')

class App extends React.Component {
  constructor(props) {
    super(props);
    // Initial state kept in seperate constants folder
    this.state = initialState;
  }

  // Loads current signed in user's information to current state
  loadUser = (currentUser) => {
    this.setState({
      user: {
        id: currentUser.id,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        rank: currentUser.rank,
        joined: currentUser.joined,
      }
    });
  }

  logOut = () => {
    this.setState(initialState);
  }

  // Handles page changes and user authentication changes
  onRouteChange = (route) => {
    this.setState({route: route});

    if(route === 'signout') {
      this.logOut();
    } else if (route === 'detect') {
      this.setState({isSignedIn: true});
    }
  }

  render() {
    const { isSignedIn, imageURL, borderBoxes, route } = this.state;
    const { firstName, rank } = this.state.user;
    let currentPage;
    // Sends user to mug detection page
    if (route === 'detect') {
      currentPage = <div>
        <Rank 
          firstName={firstName} 
          rank={rank} />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onSubmit={this.onDetectSubmit}
          imageURL={imageURL}
          borderBoxes={borderBoxes}
          user={this.state.user} />
      </div>
      
    // Sends user to sign in form
    } else if (route === 'signin') {
      currentPage = <SignIn 
        onRouteChange={this.onRouteChange} 
        loadUser={this.loadUser} />
    
    // Sends user to register page
    } else if (route === 'register') {
      currentPage = <Register 
        onRouteChange={this.onRouteChange}
        loadUser={this.loadUser} />
    
    // Sends user to about/home splash page
    } else if (route === 'home') {
      currentPage = <Splash 
        onRouteChange={this.onRouteChange}
        isSignedIn={this.state.isSignedIn} />
    }

    return (
      <div className="App">
          {/* Top Navigaton */}
          <Navigation 
          onRouteChange={this.onRouteChange} 
          isSignedIn={isSignedIn}
          currentRoute={route}
          routes={routes} />
          {currentPage}
          <div className="push"></div>
          <Footer />
      </div>
    );
  }
}

export default App;
