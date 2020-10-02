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
    }
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
    console.log(this.state.imageURL);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.setBorderBoxes(this.calculateFaceLocations(response)))
      .catch(err => console.log(err));
  }

  // --------------------------------------------------------------------------
  onRouteChange = (this_route) => {
    this.setState({route: this_route})
  }

  // --------------------------------------------------------------------------
  render() {
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} />
        { this.state.route === 'signin' 
        ? <SignIn onRouteChange={this.onRouteChange} /> :
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onSubmit={this.onDetectSubmit} />
            <FaceRecognition 
              imageURL={this.state.imageURL}
              borderBoxes={this.state.borderBoxes} />
          </div>
        }
      </div>
    );
  }

}

export default App;
