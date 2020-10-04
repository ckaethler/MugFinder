import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerFirstName: '',
            registerLastName: '',
            registerEmail: '',
            registerPassword: '',
        }
    }

    // Sets first name 
    onFirstNameChange = (event) => {
        this.setState({registerFirstName: event.target.value});
    }

    // Sets last name
    onLastNameChange = (event) => {
        this.setState({registerLastName: event.target.value});
    }

    // Sets email
    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    // Sets password
    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    // Sends attempted email and password to API
    onSubmitSignIn = () => {
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                firstName: this.state.registerFirstName,
                lastName: this.state.registerLastName,
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        }).catch(err => console.log(err));
    }

    render() {
        const { onRouteChange } = this.props;

        return (
            // Creates Register Form
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 
                shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset 
                            id="sign_up" 
                            className="ba b--transparent ph0 mh0">
                            
                            {/* Creates Card Header */}
                            <legend className="f4 fw6 ph0 mh0">
                                Create Account
                            </legend>

                            {/* Creates First Name Field */}
                            <div className="mt3">
                                <label 
                                    className="db fw6 lh-copy f6" 
                                    htmlFor="First Name">First Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent 
                                        hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="first-name"  
                                    id="first-name"
                                    onChange={this.onFirstNameChange} />
                            </div>

                            {/* Creates Last Name Field */}
                            <div className="mt3">
                                <label 
                                    className="db fw6 lh-copy f6" 
                                    htmlFor="last-name">Last Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent 
                                        hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="last-name"  
                                    id="last-name"
                                    onChange={this.onLastNameChange} />
                            </div>

                            {/* Creates Email Field */}
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
                                    onChange={this.onEmailChange} />
                            </div>

                            {/* Creates Password Field */}
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
                                    onChange={this.onPasswordChange} />
                            </div>

                            {/* Creates Confirm Password Field */}
                            <div className="mv3">
                                <label 
                                    className="db fw6 lh-copy f6" 
                                    htmlFor="confirm-password">
                                    Confirm Password
                                </label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent 
                                        hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="confirm-password"  
                                    id="confirm-password" />
                            </div>
                        </fieldset>

                        {/* Creates Submit Button */}
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black 
                                    bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Create" />
                        </div>

                        {/* Creates Sign In Link */}
                        <div className="lh-copy mt3">
                            <p
                                onClick={() => onRouteChange('signin')} 
                                className="f6 link dim black db pointer">
                                Already have an account? 
                                <strong>Sign in.</strong>
                            </p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;