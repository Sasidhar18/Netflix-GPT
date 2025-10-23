import { useState, useRef } from "react";
import Header from "./Header";
import { BG_URL, avatar } from "../Utils/constants";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import Validation from "../Utils/Validation";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMesssage] = useState("");
  const dispatch = useDispatch();
  const name = useRef();
  const email = useRef();
  const password = useRef();

  const toggleSignInForm = () => setIsSignInForm((prev) => !prev);

  const handleSignIn = () => {
    const formError = Validation(email.current.value, password.current.value);
    if (formError) {
      setErrorMesssage(formError);
      return;
    }

    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .catch((error) => {
        setErrorMesssage(error.code + " - " + error.message);
      });
  };

  const handleSignUp = () => {
    const formError = Validation(
      email.current.value,
      password.current.value,
      name.current.value,
      true
    );
    if (formError) {
      setErrorMesssage(formError);
      return;
    }

    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value,
          photoURL: avatar,
        })
          .then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }));
          })
          .catch((error) => setErrorMesssage(error.message));
      })
      .catch((error) => setErrorMesssage(error.code + " - " + error.message));
  };

  return (
    <div>
      <Header />
      <div className="background">
        <img className="bg-image" src={BG_URL} alt="background" />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="login-form">
        <h1 className="form-title">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (
          <input ref={name} type="text" placeholder="Full Name" className="input-field" />
        )}
        <input ref={email} type="text" placeholder="Email Address" className="input-field" />
        <input ref={password} type="password" placeholder="Password" className="input-field" />

        <p className="error-msg">{errorMessage}</p>

        <button
          onClick={isSignInForm ? handleSignIn : handleSignUp}
          className="submit-btn"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="toggle-text" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
