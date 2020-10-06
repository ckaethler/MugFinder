import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
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
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            }
        });
    }

    render() {
        const { onRouteChange } = this.props;
    
        return (
            // Sign In Card
            <div className="">
                    {/* Sign In Header */}
                    <h1 className="">Sign In</h1>

                    {/* Email Field */}
                    <div className="">
                        <label 
                            className="" 
                            htmlFor="email-address">Email</label>
                        <input 
                            className="" 
                            type="email" 
                            name="email-address"  
                            id="email-address" 
                            onChange={this.onEmailChange} 
                            required />
                    </div>

                    {/* Password Field */}
                    <div className="">
                        <label 
                            className="" 
                            htmlFor="password">Password</label>
                        <input 
                            className="" 
                            type="password" 
                            name="password"  
                            id="password" 
                            onChange={this.onPasswordChange} 
                            required />
                    </div>

                {/* Sign In Button */}
                <div className="">
                    <input 
                        onClick={this.onSubmitSignIn}
                        className="" 
                        type="submit" 
                        value="Sign in" />
                </div>

                {/* Register Button */}
                <div className="">
                    <p 
                        onClick={() => onRouteChange('register')} 
                        className="">
                        Don't have an account?
                        <strong>Create One.</strong>
                    </p>
                </div>
            </div>
        );
    }
}

export default SignIn;