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
    <div className="sticky  bg-transparent top-0  w-full flex justify-between p-2 items-center xl:pl-12 xl:pr-12 xl:pt-5  z-10">
      <div>
        <Link to={"/"}>
          <img
            src="/Untitled design.png"
            alt=""
            className="w-[169px] md:w-[170px] relative right-6"
          />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <AuthStatus onAuthChange={handleAuthChange} />
        {isUserLoggedIn && userEmail && (
          <span className="ml-3 text-zinc-700 relative right-5 text-xs">{userEmail}</span>
        )}

        <FormButton
          type="button"
          label={isUserLoggedIn ? "Logout" : "Log In"}
          onClick={isUserLoggedIn ? handleLogout : () => navigate("/")}
          className={`bg-zinc-300 px-4 py-2 text-black font-semibold shadow-white relative right-5 font-intra rounded-full text-sm  ${
            isUserLoggedIn ? "text-red-500" : ""
          } capitalize`}
        />
      </div>
    </div>
  );
};

export default Header;
