import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            errorMessage: '',
        }
    }

    // Sets signInEmail state
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    // Sets signInPassword state
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    // Sends attempted email and password to API
    onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword})})
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                this.props.loadUser(data);
                this.props.onRouteChange('detect');
                // this.setState({errorMessage: ''})
            }
            else {this.setState({errorMessage: ('* ' + data)})}})
        .catch(err => {
            console.log("Problem signing in")});
    }

    render() {
        const { onRouteChange } = this.props;
        const { errorMessage } = this.state;
    
        return (
            // Sign In Card
            <div className="input-card ">
                {/* Sign In Header */}
                <h1 className="card-header w-100 text-center">Sign In</h1>

                <div className="w-100">
                    {/* Email Field */}
                    <div className="">
                        <label 
                            className="input-label" 
                            htmlFor="email-address">Email</label>
                        <input 
                            className="input-form" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            placeholder="Enter email..."
                            onChange={this.onEmailChange} 
                            required />
                    </div>

                    {/* Password Field */}
                    <div className="">
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
                    </div>
                </div>
                <div className="w-100 space-between">
                    {/* Register Button */}
                    <p 
                        onClick={() => onRouteChange('register')} 
                        className="pointer">
                        Don't have an account? <strong>Create One.</strong>
                    </p>

                    {/* Sign In Button */}
                    <input 
                        onClick={this.onSubmitSignIn}
                        className="btn" 
                        type="submit" 
                        value="Sign in" />
                </div>

                {/* Error Message */}
                <div className="w-100 error-txt">
                    <p className="text-center mt-24">{errorMessage}</p>
                </div>
            </div>
        );
    }
}

export default SignIn;