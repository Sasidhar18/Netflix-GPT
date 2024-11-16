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
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMesssage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();

  const toggleSignInForm = () => {
    setIsSignInForm((prevState) => !prevState);
  };

  const handleSignIn = () => {
    const formError = Validation(email.current.value, password.current.value);
    if (formError) {
      setErrorMesssage(formError);
      return;
    }

    setErrorMesssage("");
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const { uid, email, displayName, photoURL } = userCredential.user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMesssage(errorCode + "-" + errorMessage);
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

    setErrorMesssage("");
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value,
          photoURL: avatar,
        })
          .then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid,
                email,
                displayName,
                photoURL,
              })
            );
            navigate("/browse");
          })
          .catch((error) => {
            setErrorMesssage(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMesssage(errorCode + "-" + errorMessage);
      });
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="object-cover sm:min-h-[100vh]" src={BG_URL} alt="logo" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[45%] absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          onClick={isSignInForm ? handleSignIn : handleSignUp}
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
