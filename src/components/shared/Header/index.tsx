import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../base/FormButton";
import { auth, db } from "../../../lib/config/Firebase"; // Import Firebase auth
import { doc, getDoc } from "firebase/firestore";
import AuthStatus from "../../custom/AuthStatus";
import { LogOut, User } from "lucide-react";

const Header: React.FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null); // Added state for user name
  const [credits, setcredits] = useState<number>(0);
  const [userProfileUrl, setUserProfileUrl] = useState<string | null>(null); // Added state for user profile URL
  const [headerBackground, setHeaderBackground] =
    useState<string>("transparent"); // Added state for header background
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false); // Added state for profile menu visibility
  const navigate = useNavigate();

  const handleAuthChange = async (
    isAuthenticated: boolean,
    email?: string | null,
    displayName?: string | null,
    photoURL?: string | null
  ) => {
    setIsUserLoggedIn(isAuthenticated);
    setUserEmail(email || null);
    setUserName(photoURL || null); // Update user name state
    setUserProfileUrl(displayName || null); // Update user profile URL state

    if (isAuthenticated) {
      // Fetch credits from Firestore when the user is logged in
      await fetchcredits();
    }
  };

  const fetchcredits = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid); // Get user document by UID
      const userDoc = await getDoc(userRef); // Fetch the user document

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setcredits(userData?.credits || 0); // Set the user's credits if available, otherwise default to 0
      }
    }
  };

  // Log the userName and userProfileUrl when the state changes
  useEffect(() => {
    console.log(userName);
    console.log(userProfileUrl);
  }, [userName, userProfileUrl]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsUserLoggedIn(false);
      setUserEmail(null);
      setUserName(null); // Reset user name state
      setUserProfileUrl(null); // Reset user profile URL state
      setcredits(0);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.2) {
        setHeaderBackground("black");
      } else {
        setHeaderBackground("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="sticky bg-transparent top-0 w-full flex justify-between p-2 items-center xl:pl-12 xl:pr-12 xl:pt-5 z-10"
      style={{ backgroundColor: headerBackground }}
    >
      <div>
        <Link to={"/"}>
          <img
            src="/Untitled design.png"
            alt=""
            className="w-[169px] md:w-[170px] relative right-6"
          />
        </Link>
      </div>

      {/* authin details */}
      <div className="flex items-center gap-5 ">
        <AuthStatus onAuthChange={handleAuthChange} />
        {isUserLoggedIn && userEmail && (
          <div className="flex  flex-col">
            <h1 className=" text-zinc-700  text-xs xl:text-base xl: xl:font-medium xl:text-zinc-400">
              {userName}
            </h1>
            <h1 className="text-[#646463] font-bold  text-end">
              {" "}
              credits: {credits}
            </h1>
          </div>
        )}

        <div className="flex gap-3 justify-center items-center">
          {isUserLoggedIn ? (
            <div className="relative">
              <img
                src={userProfileUrl || "/profile-photo.png"} // Use user profile URL if available
                alt="Profile Photo"
                className="w-10 h-10 rounded-full cursor-pointer  "
                onClick={() => setShowProfileMenu((prev) => !prev)}
              />
              {showProfileMenu && (
                <div className="absolute top-12 right-0 bg-gray-900 gap-3 duration-500  rounded-3xl shadow-lg flex flex-col justify-start p-4  w-[220px]">
                  <div className="flex justify-start gap-3 items-center">
                    <img
                      src={userProfileUrl || "/profile-photo.png"} // Use user profile URL if available
                      alt="Profile Photo"
                      className="w-10 h-10 rounded-full "
                    />
                    <p> @{userName ? userName.split(" ")[1] : ""}</p>
                  </div>
                  <div className="flex justify-center flex-col gap-4">
                    <Link to={"/profile"} className="flex justify-start px-5  gap-3 hover:bg-gray-800 py-2 rounded-xl">
                      <button className="flex gap-3 justify-start" >
                        {" "}
                        <User /> Profile
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className=" text-left text-red-500 hover:bg-gray-800 py-2 rounded-xl  flex justify-start px-5 gap-3 items-center hover:text-gray-300 "
                    >
                      <LogOut /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <FormButton
              type="button"
              label={"Log In"}
              onClick={() => navigate("/auth/login")}
              className="px-4 py-3 font-semibold shadow-white relative right-5 font-intra rounded-full text-sm border capitalize"
            />
          )}
          {!isUserLoggedIn && (
            <FormButton
              type="button"
              label={"Signup"}
              onClick={() => navigate("/auth/signup")}
              className={` px-4 py-3 font-semibold shadow-white relative right-5 font-intra rounded-full text-sm text-white border capitalize`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
