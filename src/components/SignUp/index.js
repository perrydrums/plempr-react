import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
    <>
        <h1>SignUp</h1>
        <SignUpForm />
    </>
);

const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    error: null,
};

class SignUpFormBase extends Component {

    constructor(props) {
        super(props);

        this.state = { ...initialState };
    }

    onSubmit = event => {
        const { email, username, password } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                this.props.firebase.doCreateUserData(authUser.user.uid, username);
                this.setState({ ...initialState });
                this.props.history.push(ROUTES.CHAT);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username,
            email,
            password,
            passwordConfirm,
            error,
        } = this.state;

        const isInvalid =
            password !== passwordConfirm ||
            password === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="gebruikersnaam"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="email"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="wachtwoord"
                />
                <input
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={this.onChange}
                    type="password"
                    placeholder="bevestig wachtwoord"
                />
                <button type="submit" disabled={isInvalid}>
                    aanmelden
                </button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
