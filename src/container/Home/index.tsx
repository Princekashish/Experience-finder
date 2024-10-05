import React, { useEffect, useState } from "react";
import HeroSection from "../../view/HeroSection";
import AI from "../../view/AI";
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/config/Firebase";
import { onAuthStateChanged } from "firebase/auth";

const index: React.FC = () => {

  const navigate = useNavigate();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setIsUserLoggedIn(true);
  //     } else {
  //       setIsUserLoggedIn(false);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  const handleButtonClick = () => {
    navigate("/dasboard");
  };
  return (
    <div>
      <HeroSection handleSubmit={handleButtonClick} />
      <AI />
    </div>
  );
};

export default index;
