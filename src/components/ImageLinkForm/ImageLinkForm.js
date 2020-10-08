// Creates detect image form for user to upload photos
import React from 'react';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import "./ImageLinkForm.css";

class  ImageLinkForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            errors: false,
            errorMessage: '',
            borderBoxes: this.props.borderBoxes,
            imageURL: this.props.imageURL,
            user: this.props.user,
        }
    }

    // Sets state of user's inputted URL
    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    // Sets state of face boxes
    setBorderBoxes = (boxes) => {
        this.setState({borderBoxes: boxes});
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

        }});
        
        return setBorderBoxes;
    }

    // Sets error message state
    setError(message) {
        this.setState({
            errorMessage: ('* ' + message),
            errors: true,
        });
    }

    // Resets error message to an empty string
    resetErrorMessage() {
        this.setState({
            errorMessage: '',
            errors: false
        });
    }

    // Handles when users submits a URL of a picture
    onDetectSubmit = () => {
        this.setState({imageURL: this.state.input});
        fetch('https://mugfinder-api.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({input: this.state.input})})
        .then(resp => resp.json())
        .then(response => {
            if (response.outputs) {
                this.resetErrorMessage();
                this.setBorderBoxes(this.calculateFaceLocations(response));
                return response;
            } else {
                this.setState({
                    input: '',
                    borderBoxes: [],
                    imageURL: ''
                });
                this.setError(response);
                return false; }})
        .then(response => {
            // makes call to API to update user rank
            fetch('https://mugfinder-api.herokuapp.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: this.state.user.id})})
            .then(response => response.json())
            .then(data => {
                this.setState(Object.assign(this.state.user, { rank: data.rank }))})
            .catch(err => this.setError(err))})
        .catch(err => this.setError(err));
    }

    render() {
        const {imageURL, borderBoxes, errorMessage} = this.state;
        return (
            <div className="w-80 m-auto shadow-box p-56">
                <div className="">
                    <label 
                        className="input-label" 
                        htmlFor="url">Detect someone's mug:</label>
                </div>
                
                <div className="space-between">
                    <input 
                        className="input-form" 
                        type="text" 
                        name="url"  
                        id="url"
                        placeholder="Enter a url..."
                        onChange={this.onInputChange} 
                        required />
                    <button 
                        className="btn ml-16" 
                        onClick={this.onDetectSubmit}>
                        Detect
                    </button>
                </div>

                {/* Error Message */}
                <div className="w-100 error-txt">
                    <p className="text-center mt-24">{errorMessage}</p>
                </div>
                
                <FaceRecognition 
                    imageURL={imageURL}
                    borderBoxes={borderBoxes} />
            </div>
        );
    }
}

export default ImageLinkForm;