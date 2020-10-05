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
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 
                shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        
                        {/* Input Fields */}
                        <fieldset 
                            id="sign_up" 
                            className="ba b--transparent ph0 mh0">
                            {/* Sign In Header */}
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>

                            {/* Email Field */}
                            <div className="mt3">
                                <label 
                                    className="db fw6 lh-copy f6" 
                                    htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent 
                                        hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    onChange={this.onEmailChange} 
                                    required />
                            </div>

                            {/* Password Field */}
                            <div className="mv3">
                                <label 
                                    className="db fw6 lh-copy f6" 
                                    htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba 
                                        bg-transparent hover-bg-black 
                                        hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    onChange={this.onPasswordChange} 
                                    required />
                            </div>
                        </fieldset>

                        {/* Sign In Button */}
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black 
                                    bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in" />
                        </div>

                        {/* Register Button */}
                        <div className="lh-copy mt3">
                            <p 
                                onClick={() => onRouteChange('register')} 
                                className="f6 link dim black db pointer">
                                Don't have an account?
                                <strong>Create One.</strong>
                            </p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;