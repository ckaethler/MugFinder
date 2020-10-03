// ----------------------------------------------------------------------------
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

// ----------------------------------------------------------------------------
const app = new Clarifai.App({ apiKey: 'a4a64ffe50b94055b3632f9e41fb7313' });

// ----------------------------------------------------------------------------
class App extends React.Component {
  // --------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageURL: '',
      borderBoxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        entries: 0,
        joined: new Date(),
      }
    }
  }

  loadUser = (currentUser) => {
    this.setState({
      user: {
        id: currentUser.id,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        entries: currentUser.entries,
        joined: currentUser.joined,
      }
    });
  }

  // --------------------------------------------------------------------------
  calculateFaceLocations = (data) => {
    const image = document.getElementById("mugImage");
    const height = Number(image.height);
    const width = Number(image.width);
    const rawData = data.outputs[0].data.regions;


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

  // --------------------------------------------------------------------------
  setBorderBoxes = (boxes) => {
    this.setState({borderBoxes: boxes});
  }

  // --------------------------------------------------------------------------
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // --------------------------------------------------------------------------
  onDetectSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.setBorderBoxes(this.calculateFaceLocations(response)))
      .catch(err => console.log(err));
  }

  // --------------------------------------------------------------------------
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route})
  }

  // --------------------------------------------------------------------------
  render() {
    const { isSignedIn, imageURL, borderBoxes, route } = this.state;
    return (
      <div className="App">
        <Navigation 
          onRouteChange={this.onRouteChange} 
          isSignedIn={isSignedIn} />
        { route === 'home' 
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onSubmit={this.onDetectSubmit} />
            <FaceRecognition 
              imageURL={imageURL}
              borderBoxes={borderBoxes} />
          </div> 
          : (route === 'signin' ?
              <SignIn onRouteChange={this.onRouteChange} /> :
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
