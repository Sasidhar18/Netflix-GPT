import React, { useEffect } from "react";
import { LOGO } from "../Utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { addUser, removeUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { toggleGPT } from "../Utils/gptSlice";

const Header = () => {
  const user = useSelector((state) => state.user);
  const showGptSearch = useSelector((state) => state.gpt.gptShow);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({ uid, email, displayName, photoURL })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptToggle = () => {
    dispatch(toggleGPT());
  };

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.log(error.message));
  };

  return (
    <div className="header">
      <img className="logo" src={LOGO} alt="logo" />
      {user && (
        <div className="user-section">
          {/* <button className="gpt-btn" onClick={handleGptToggle}>
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button> */}
          <img
            className="user-icon"
            alt="usericon"
            src="https://loodibee.com/wp-content/uploads/Netflix-avatar-7.png"
          />
          <button onClick={handleSignOut} className="signout-btn">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
