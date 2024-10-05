import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../base/FormButton";

const Header: React.FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const     navigate=useNavigate() 

  useEffect(() => {
    const users = localStorage.getItem("uid");
    if (users) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  const handleLogin = () => {
    localStorage.removeItem("uid");
    setIsUserLoggedIn(false);
    navigate('/dasboard')

  };

  return (
    <div className="sticky bg-white  top-0 w-full flex justify-between items-center xl:pl-12 xl:pr-12 xl:pt-5 p-3 z-10">
      <div>
        <Link to={"/"}>
          <img src="/logo-black.png" alt="" className="w-[134px] md:w-[243px]" />
        </Link>
      </div>
      <div className="">
        <FormButton
          type="button"
          label={isUserLoggedIn ? "Logout" : "Log In"}
          onClick={handleLogin}
          className="bg-[#F5F5F5] px-3 py-2 font-intra rounded-full text-base text-black capitalize"
        />
      </div>
    </div>
  );
};

export default Header;
