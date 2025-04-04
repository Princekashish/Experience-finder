import React from "react";
import HeroSection from "../../view/HeroSection";
import AI from "../../view/AI";
import { useNavigate } from "react-router-dom";
import Need from "../../view/AI/Need";
import Reviews from "../../view/AI/Reviews";

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
    navigate("/dashboard");
  };
  return (
    <div>
      <HeroSection handleSubmit={handleButtonClick} />
      <AI />
      <Need />
      <Reviews/>
    </div>
  );
};

export default index;
