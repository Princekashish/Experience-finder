import React from "react";
import HeroSection from "../../view/HeroSection";
import AI from "../../view/AI";
import { useNavigate } from "react-router-dom";

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
