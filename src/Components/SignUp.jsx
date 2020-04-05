import React, {useState} from "react";
import * as ROUTES from '../constants/routes';
import {withFirebase} from "./Firebase";

const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();

        const roles = {};
        props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return props.firebase.user(authUser.user.uid).set({
                    displayName,
                    email,
                    roles,
                });
            })
            .then(() => {
                return props.firebase.doSendEmailVerification();
            })
            .then(() => {
                setEmail("");
                setPassword("");
                setDisplayName("");
                props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                setError(error);
            });


    };

    const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

    const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

    const onChangeHandler = event => {
        const {name, value} = event.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        } else if (name === "displayName") {
            setDisplayName(value);
        }
    };

    return (
        <div className="mt-8">
            <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
            <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                {error !== null && (
                    <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
                        {error.message}
                    </div>
                )}
                <form className="">
                    <label htmlFor="displayName" className="block">
                        Display Name:
                    </label>
                    <input
                        type="text"
                        className="my-1 p-1 w-full "
                        name="displayName"
                        value={displayName}
                        placeholder="E.g: Andrew"
                        id="displayName"
                        onChange={event => onChangeHandler(event)}
                    />
                    <label htmlFor="userEmail" className="block">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="my-1 p-1 w-full"
                        name="userEmail"
                        value={email}
                        placeholder="E.g: user123@gmail.com"
                        id="userEmail"
                        onChange={event => onChangeHandler(event)}
                    />
                    <label htmlFor="userPassword" className="block">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="mt-1 mb-3 p-1 w-full"
                        name="userPassword"
                        value={password}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange={event => onChangeHandler(event)}
                    />
                    <button
                        className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
                        onClick={event => {
                            createUserWithEmailAndPasswordHandler(event, email, password);
                        }}
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};
export default withFirebase(SignUp);
