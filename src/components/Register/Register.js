import React from 'react';

const onlyLetters = (/^[A-Za-z]+$/);
const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: false,
            errorMessage: '',
        }
    }

    // Checks a string to see if contains only letters
    containsOnlyLetters (input) {
        if (onlyLetters.test(input)) return true;
        else return false;
    }

    // Checks a string to see if valid email format
    validEmail(input) {
        if (validEmail.test(input)) return true;
        else return false;
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

    // Sets first name state
    onFirstnameChange = (event) => {
        this.setState({firstname: event.target.value});
    }

    // Sets last name state
    onLastNameChange = (event) => {
        this.setState({lastname: event.target.value});
    }

    // Sets email state
    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    // Sets password
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    // Sets confirm password
    onPasswordConfirm = (event) => {
        this.setState({confirmPassword: event.target.value});
    }

    // Validates fields
    validateFields = () => {
        const {firstname, lastname, email } = this.state;
        const {password, confirmPassword} = this.state;
        
        if(!this.containsOnlyLetters(firstname)) {
            this.setError("First name can only contain letters.")
            return false;
        } else if (!this.containsOnlyLetters(lastname)) {
            this.setError("Last name can only contain letters");
            return false;
        } else if (!this.validEmail(email)) {
            this.setError("Email is invalid format");
            return false;
        } else if (!(password === confirmPassword)) {
            this.setError("Passwords don't match.");
            return false;
        } else {
            this.resetErrorMessage();
            return true;
        }
    }

    // Sends attempted email and password to API
    onSubmitRegister = () => {
        if(this.validateFields()) {   
            fetch('https://mugfinder-api.herokuapp.com/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname})})
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    this.props.loadUser(data);
                    this.props.onRouteChange('detect');
                    this.setState({errorMessage: ''})}
                else {this.setState({errorMessage: ('* ' + data)})}})
            .catch(err => console.log(err));
        }
    }

    render() {
        const { onRouteChange } = this.props;
        const { errorMessage } = this.state;
        return (
            // Register Card
            <div className="input-card ">
                {/* Create Account Header */}
                <h1 className="card-header w-100 text-center">Create Account</h1>

                {/* Input Fields */}
                <div className="w-100">
                    {/* First Name Field */}
                    <label 
                        className="input-label" 
                        htmlFor="firstname">First Name</label>
                    <input 
                        className="input-form" 
                        type="text" 
                        name="firstname"  
                        id="firstname"
                        placeholder="Enter first name..."
                        onChange={this.onfirstnameChange} 
                        required />

                    {/* Last Name Field */}
                    <label 
                        className="input-label" 
                        htmlFor="lastname">Last Name</label>
                    <input 
                        className="input-form" 
                        type="text" 
                        name="lastname"  
                        id="lastname"
                        placeholder="Enter last name..."
                        onChange={this.onLastNameChange} 
                        required />

                    {/* Email Field */}
                    <label 
                        className="input-label" 
                        htmlFor="email">Email</label>
                    <input 
                        className="input-form" 
                        type="email" 
                        name="email"  
                        id="email"
                        placeholder="Enter email..."
                        onChange={this.onEmailChange} 
                        required />

                    {/* Password Field */}
                    <label 
                        className="input-label" 
                        htmlFor="password">Password</label>
                    <input 
                        className="input-form" 
                        type="password" 
                        name="password"  
                        id="password" 
                        placeholder="Enter password..."
                        onChange={this.onPasswordChange} 
                        required />

                    {/* Confirm Password Field */}
                    <label 
                        className="input-label" 
                        htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        className="input-form" 
                        type="password" 
                        name="confirmPassword"  
                        id="confirmPassword" 
                        placeholder="Retype password..."
                        onChange={this.onPasswordConfirm} 
                        required />
                </div>
                
                {/* Register and Sign in Buttons */}
                <div className="w-100 space-between">
                    {/* Register Button */}
                    <p 
                        onClick={() => onRouteChange('signin')} 
                        className="pointer">
                        Already have an account? <strong>Sign in.</strong>
                    </p>

                    {/* Register Button */}
                    <input 
                        onClick={this.onSubmitRegister}
                        className="btn" 
                        type="submit" 
                        value="Create" />
                </div>

                {/* Error Message */}
                <div className="w-100 error-txt">
                    <p className="text-center mt-24">{errorMessage}</p>
                </div>
            </div>
        );
    }
}

export default Register;