import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

const Browse = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="absolute">
      <Header />
      <div>
        <div className=" mt-[40%] ms-5 text-3xl">
          Hello <strong>{user.displayName}</strong>, Please sent Rs 500 to Mr
          Sasidhar, then only content will be added soon.
        </div>
      </div>
    </div>
  );
};

export default Browse;
