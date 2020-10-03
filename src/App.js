import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import 'tachyons';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register'

// Creates Clarifai Authorization and connection to API
const app = new Clarifai.App({ apiKey: 'a4a64ffe50b94055b3632f9e41fb7313' });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  // Loads current signed in user's information to current state
  loadUser = (currentUser) => {
    console.log(currentUser);
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

  // Creates object with information on location of faces in given image
  calculateFaceLocations = (data) => {
    const image = document.getElementById("mugImage");
    const height = Number(image.height);
    const width = Number(image.width);
    const rawData = data.outputs[0].data.regions;

    // calculates corners of face boxes based on image size
    const setBorderBoxes = rawData.map(faceObj => {
      const boxInfo = faceObj.region_info.bounding_box;
      return {
        leftCol: boxInfo.left_col * width,
        topRow: boxInfo.top_row * height,
        rightCol: width - (boxInfo.right_col * width),
        bottomRow: height - (boxInfo.bottom_row * height),
      }
    });
    
    return setBorderBoxes;
  }

  // Sets state of face boxes
  setBorderBoxes = (boxes) => {
    this.setState({borderBoxes: boxes});
  }

  // Sets state of user's inputted URL
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // Handles when users submits a URL of a picture
  onDetectSubmit = () => {
    // this.setState({imageURL: this.state.input});
    // app.models
    //   .predict(
    //     Clarifai.FACE_DETECT_MODEL, 
    //     this.state.input)
    //   .then(response => {
    //     this.setBorderBoxes(this.calculateFaceLocations(response))
    //   })
    //   .then(response => {
    //     if (response) {
      console.log(this.state.user);
          // makes call to API to update user rank
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id              
            })
          })
          .then(response => response.json())
          .then(data => {
            this.setState(Object.assign(this.state.user, { rank: data.rank }));
          })
          .catch(err => console.log(err));
  }

  // Handles page changes and user authentication changes
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route})
  }

  render() {
    const { isSignedIn, imageURL, borderBoxes, route } = this.state;
    const { firstName, rank } = this.state.user;
    return (
      <div className="App">
        {/* Top Navigaton */}
        <Navigation 
          onRouteChange={this.onRouteChange} 
          isSignedIn={isSignedIn} />
        
        {/* Authenticated: Main URl Detection Page */}
        { route === 'home' 
          ? <div>
            <Logo />
            <Rank 
              firstName={firstName} 
              rank={rank} />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onSubmit={this.onDetectSubmit} />
            <FaceRecognition 
              imageURL={imageURL}
              borderBoxes={borderBoxes} />
          </div>

          // Not Authenticated: User either is signing in or registering
          : (route === 'signin' ?
              <SignIn 
                onRouteChange={this.onRouteChange} 
                loadUser={this.loadUser} /> :
              <Register 
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser} />
            )
        }
      </div>
    );
  }
}

export default App;
