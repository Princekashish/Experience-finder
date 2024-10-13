import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../base/FormButton";
import { auth } from "../../../lib/config/Firebase"; // Import Firebase auth
import AuthStatus from "../../custom/AuthStatus";

const Header: React.FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [headerBackground, setHeaderBackground] = useState<string>('transparent'); // Added state for header background
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
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.2) {
        setHeaderBackground('black');
      } else {
        setHeaderBackground('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky bg-transparent top-0 w-full flex justify-between p-2 items-center xl:pl-12 xl:pr-12 xl:pt-5 z-10" style={{ backgroundColor: headerBackground }}>
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
          <span className="ml-3 text-zinc-700 relative right-5 text-xs xl:text-base xl:right-9 xl:font-medium xl:text-zinc-400">{userEmail}</span>
        )}

        <FormButton
          type="button"
          label={isUserLoggedIn ? "Logout" : "Log In"}
          onClick={isUserLoggedIn ? handleLogout : () => navigate("/")}
          className={` px-4 py-2 text-black font-semibold shadow-white relative right-5 font-intra rounded-full text-sm  ${
            isUserLoggedIn ? "text-red-500 bg-zinc-800" : "bg-zinc-300"
          } capitalize`}
        />
      </div>
    </div>
  );
};

export default Header;
