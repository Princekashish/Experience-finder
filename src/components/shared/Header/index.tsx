import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../base/FormButton";
import { auth } from "../../../lib/config/Firebase"; // Import Firebase auth
import AuthStatus from "../../custom/AuthStatus";

const Header: React.FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuthChange = (
    isAuthenticated: boolean,
    email?: string | null
  ) => {
    setIsUserLoggedIn(isAuthenticated);
    setUserEmail(email || null);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsUserLoggedIn(false);
      setUserEmail(null);
      navigate("/dasboard");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="sticky bg-transparent top-0 w-full flex justify-between items-center xl:pl-12 xl:pr-12 xl:pt-5 p-3 z-10">
      <div>
        <Link to={"/"}>
          <img
            src="/logo-black.png"
            alt=""
            className="w-[134px] md:w-[243px]"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <AuthStatus onAuthChange={handleAuthChange} />
        {isUserLoggedIn && userEmail && (
          <span className="ml-3 text-black">{userEmail}</span>
        )}

        <FormButton
          type="button"
          label={isUserLoggedIn ? "Logout" : "Log In"}
          onClick={isUserLoggedIn ? handleLogout : () => navigate("/")}
          className="bg-[#F5F5F5] px-3 py-2 font-intra rounded-full text-base text-black capitalize"
        />
      </div>
    </div>
  );
};

export default Header;
