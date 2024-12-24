// import { useContext, useState } from "react";

// import { assets } from "../assets";
// import { Link, NavLink } from "react-router-dom";
// import { LuMenu, LuX } from "react-icons/lu";
// import Button from "./Button";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { AuthContext } from "@/context/AuthContext";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   // const [isLoggedIn, setIsLoggedIn] = useState(false);
//   // const [userProfile, setUserProfile] = useState("");
//   const { isLoggedIn } = useContext(AuthContext);
//   console.log(isLoggedIn);
//   // useEffect(() => {
//   //   if (isLoggedIn) {
//   //     const userInfo = JSON.parse(localStorage.getItem("user"))[
//   //       "profile_image"
//   //     ];
//   //     setUserProfile(userInfo);
//   //   }
//   // }, [isLoggedIn]);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="bg-mainColor w-full fixed z-10">
//       <div className="max-w-7xl m-auto flex justify-between items-center px-2 gap-8 text-white">
//         <Link to="/">
//           <img
//             src={assets.logo}
//             alt="JobPros Logo"
//             className="w-[80px] md:w-[120px]"
//           />
//         </Link>
//         <ul className="hidden md:flex gap-4 lg:gap-12">
//           <li>
//             <NavLink
//               to="/"
//               className="flex flex-col items-center justify-center"
//             >
//               <p>Home</p>
//               <hr className="w-1/2 h-[1.5px] bg-white border-none hidden" />
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/about"
//               className="flex flex-col items-center justify-center"
//             >
//               <p>About Us</p>
//               <hr className="w-1/2 h-[1.5px] bg-white border-none hidden" />
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/jobs"
//               className="flex flex-col items-center justify-center"
//             >
//               <p>All Jobs</p>
//               <hr className="w-1/2 h-[1.5px] bg-white border-none hidden" />
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/contact"
//               className="flex flex-col items-center justify-center"
//             >
//               <p>Contact Us</p>
//               <hr className="w-1/2 h-[1.5px] bg-white border-none hidden" />
//             </NavLink>
//           </li>
//         </ul>
//         {isLoggedIn ? (
//           <Avatar>
//             <AvatarImage src={assets.reviewer2} alt="User Avatar" />
//             <AvatarFallback>LS</AvatarFallback>
//           </Avatar>
//         ) : (
//           <ul className="hidden md:flex gap-4 lg:gap-12 items-center justify-center">
//             <li>
//               <Link to="/login">
//                 <Button name="Login" type="hover" />{" "}
//               </Link>
//             </li>
//             <li>
//               <Link to="/register">
//                 <Button name="Register Now" type="hover" />
//               </Link>
//             </li>
//           </ul>
//         )}
//         <LuMenu className="md:hidden" onClick={toggleMenu} />
//       </div>

//       {/* Menu for small screen */}
//       <div
//         className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-mainColor text-white transition-all z-10 h-screen ${
//           isMenuOpen ? "w-full" : "hidden"
//         }`}
//       >
//         <div className="flex flex-col">
//           <div className="flex items-center gap-4 p-4">
//             <LuX onClick={toggleMenu} />
//           </div>
//           <ul className="p-4 flex flex-col gap-5">
//             <li>
//               <NavLink to="/" onClick={toggleMenu}>
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/about" onClick={toggleMenu}>
//                 About Us
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/jobs" onClick={toggleMenu}>
//                 All Jobs
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/contact" onClick={toggleMenu}>
//                 Contact Us
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/login" onClick={toggleMenu}>
//                 <Button name="Login" type="hover" />
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/register" onClick={toggleMenu}>
//                 <Button name="Register Now" type="hover" />
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState, useContext, useEffect } from "react";
import { assets } from "../assets";
import { Link, NavLink } from "react-router-dom";
import { LuMenu, LuSettings, LuX } from "react-icons/lu";
import Button from "./Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiBriefcase } from "react-icons/hi";
import { LucideLogOut } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";

const users = [
  { id: 1, name: "Lalit", isLoggedIn: true, img: assets.reviewer1 },
  { id: 2, name: "Saurabh", isLoggedIn: false },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //   // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userProfile, setUserProfile] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const userInfo = JSON.parse(localStorage.getItem("user"))[
  //       "profile_image"
  //     ];
  //     setUserProfile(userInfo);
  //   }
  // }, [isLoggedIn]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const toggleUserProfile = () => {
    setIsUserProfileOpen(!isUserProfileOpen);
  };

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  return (
    <nav className="bg-mainColor w-full fixed z-10">
      <div className="max-w-7xl m-auto flex justify-between items-center px-2 gap-8 text-white">
        <LuMenu className="md:hidden" onClick={toggleMenu} />
        <Link to="/">
          <img
            src={assets.logo}
            alt="JobPros Logo"
            className="w-[80px] md:w-[120px]"
          />
        </Link>
        <ul className="hidden md:flex gap-4 lg:gap-12">
          <li>
            <NavLink
              to="/"
              className="flex flex-col items-center justify-center"
            >
              <p>Home</p>
              <hr className="w-1/2 h-[1.5px] bg-white border-none hidden" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="flex flex-col items-center justify-center"
            >
              <p>About Us</p>
              <hr className="w-1/2 h-[1.5px] bg-white border-none hidden" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jobs"
              className="flex flex-col items-center justify-center"
            >
              <p>All Jobs</p>
              <hr className="w-1/2 h-[1.5px] bg-white border-none hidden" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="flex flex-col items-center justify-center"
            >
              <p>Contact Us</p>
              <hr className="w-1/2 h-[1.5px] bg-white border-none hidden" />
            </NavLink>
          </li>
        </ul>
        {isLoggedIn ? (
          <div className="relative cursor-pointer" onClick={toggleUserProfile}>
            <Avatar
              className="bg-white text-black rounded-full w-6 h-6 md:w-10 md:h-10 flex items-center justify-center"
              key={users[0].id}
            >
              <AvatarImage src={users[0].img} alt={users[0].name} />
              <AvatarFallback>LS</AvatarFallback>
            </Avatar>

            <div
              className={`${
                isUserProfileOpen ? "block" : "hidden"
              } absolute w-40 px-3 py-4 right-0 mt-2 bg-white text-black flex flex-col gap-3 text-sm rounded shadow-boxShadow`}
            >
              <Link to={`/${users[0].id}/applied-jobs`}>
                <div className="flex items-center gap-2">
                  <HiBriefcase className="size-4" />
                  <span> Applied Jobs</span>
                </div>
              </Link>
              <Link to={`/${users[0].id}/settings`}>
                <div className="flex items-center gap-2">
                  <LuSettings fill="black" className="text-white" size={16} />
                  <span> Settings</span>
                </div>
              </Link>
              <div
                className="flex items-center gap-2"
                onClick={() => {
                  localStorage.removeItem("authTokens");
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
              >
                <LucideLogOut size={16} />
                <span> Logout</span>
              </div>
            </div>
          </div>
        ) : (
          <ul className="hidden md:flex gap-4 lg:gap-12 items-center justify-center">
            <li>
              <Link to="/login">
                <Button name="Login" type="hover" />{" "}
              </Link>
            </li>
            <li>
              <Link to="/register">
                <Button name="Register Now" type="hover" />
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Menu for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-mainColor text-white transition-all z-10 h-screen ${
          isMenuOpen ? "w-full" : "hidden"
        }`}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-4 p-4">
            <LuX onClick={toggleMenu} />
          </div>
          <ul className="p-4 flex flex-col gap-5">
            <li>
              <NavLink to="/" onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={toggleMenu}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/jobs" onClick={toggleMenu}>
                All Jobs
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={toggleMenu}>
                Contact Us
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>Logout</li>
            ) : (
              <div>
                <li>
                  <NavLink to="/login" onClick={toggleMenu}>
                    <Button name="Login" type="hover" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" onClick={toggleMenu}>
                    <Button name="Register Now" type="hover" />
                  </NavLink>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
