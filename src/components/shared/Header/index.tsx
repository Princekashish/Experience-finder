import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../lib/config/Firebase"; // Import Firebase auth
import { doc, getDoc } from "firebase/firestore";
import AuthStatus from "../../custom/AuthStatus";
import { User } from "lucide-react";

const Header: React.FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null); // Added state for user name
  const [credits, setcredits] = useState<number>(0);
  const [userProfileUrl, setUserProfileUrl] = useState<string | null>(null); // Added state for user profile URL
  const [headerBackground, setHeaderBackground] =
    useState<string>("transparent"); // Added state for header background
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Fixed location for India
  const location = { code: "IN", name: "India" };

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

  const navbar = [
    { text: "Setting", link: "/setting" },
    { text: "Manage Subscription", link: "/payment" },
    { text: "About", link: "/about" },
    { text: "Contact", link: "/contact" },
    { text: "Terms of Service", link: "/terms-of-service" },
    ...(isUserLoggedIn
      ? [
        { text: "Profile", link: "/profile" },
        { text: "Sign Out", link: "#", onClick: handleLogout },
      ]
      : [{ text: "Login", link: "auth/login" }]),
  ];

  // Log the userName and userProfileUrl when the state changes
  useEffect(() => {
    // console.log(userName);
    // console.log(userProfileUrl);
  }, [userName, userProfileUrl]);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className="sticky bg-transparent top-0 w-full flex justify-between p-2 items-center xl:pl-12 xl:pr-12 xl:pt-5 z-30 "
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
      <h1 className="hidden">{userEmail}</h1>
      {/* authin details */}
      {/* <div className="flex items-center gap-5 ">
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
      </div> */}

      <div className="flex items-center gap-3  relative right-2 md:right-0">
        <AuthStatus onAuthChange={handleAuthChange} />
        {/* For Partners text with icon */}
        <div className="hidden md:flex items-center gap-2 relative group cursor-pointer ">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-white font-medium">For Partners</span>

          {/* Tooltip */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-700 rounded-md text-white text-xs px-3 py-1  shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            Integrate in your application
          </div>
        </div>

        {/* Language selector (India) */}
        <div
          className="relative flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="text-sm font-light">{location.code}</span>

          {isHovered && (
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
              {location.name}
            </div>
          )}
        </div>

        {/* User profile / menu button */}
        <button
          className="flex items-center justify-center  rounded-full px-3 py-1 gap-1   border border-gray-200"
          onClick={toggleMenu}
        >
          <div>
            {userProfileUrl ? (
              <img
                src={
                  userProfileUrl ||
                  "https://i.pinimg.com/736x/56/5a/5b/565a5be6ea2dc0ab63f206e52a70c8b9.jpg"
                }
                alt="User Profile"
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <User size={18} />
            )}
          </div>
          <div>
            {isUserLoggedIn ? (
              <div className="flex justify-center items-center">
                <span className="text-sm font-medium">{credits} </span>
                <img src="/coin_794625.png" alt="" className="h-5 w-5" />
              </div>
            ) : (
              ""
            )}
          </div>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""
              }`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu - optional */}
      {isMenuOpen && (
        <div className="absolute top-full mt-2 right-7 w-48 bg-zinc-900 rounded-xl shadow-xl z-20">
          <ul className="flex flex-col p-2 ">
            {navbar.map((item, index) => (
              <li
                key={index}
                className={`p-2 ${index === 0 || index === 3 ? "border-white/30 border-t" : ""
                  } w-full text-sm`}
              >
                {item.onClick ? (
                  <button
                    onClick={() => {
                      item.onClick();
                      setIsMenuOpen(false);
                    }}
                    className="text-white hover:text-gray-600  "
                  >
                    {item.text}
                  </button>
                ) : (
                  <Link
                    to={item.link}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-gray-600 "
                  >
                    {item.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
