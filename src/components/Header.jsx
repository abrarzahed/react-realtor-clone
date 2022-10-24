import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
export default function Header() {
  const location = useLocation();
  // states
  const [signInOrProfile, setSignInOrProfile] = useState("Sign in");

  // auth
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignInOrProfile("Profile");
      } else {
        setSignInOrProfile("Sign in");
      }
    });
  }, [auth]);

  const matchPathRoute = (route) => {
    if (route === location.pathname) return true;
    return false;
  };

  const applyClasses = (route) => {
    const classes = `py-2 mt-6 sm:mt-0 sm:py-5 text-sm font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
      matchPathRoute(route) && "text-black font-black border-b-red-500"
    } `;

    return classes;
  };

  return (
    <div className="bg-white bg-opacity-50 backdrop-blur-md border-b shadow-sm sticky top-0 z-40">
      <header className="flex flex-col items-center justify-center sm:flex-row sm:justify-between sm:items-center px-3 max-w-6xl mx-auto">
        <div>
          <Link to="/">
            <img
              src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
              alt="realtor-logo"
              className="h-6 cursor-pointer mt-5 sm:mt-0"
            />
          </Link>
        </div>
        <nav>
          <ul className="flex items-center space-x-10">
            <li className={`${applyClasses("/")}`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`${applyClasses("/offers")}`}>
              <Link to="/offers">Offers</Link>
            </li>
            <li
              className={`${applyClasses("/signin")} ${applyClasses(
                "/profile"
              )} ${applyClasses("/signup")} ${applyClasses(
                "/forgot-password"
              )}`}
            >
              <Link to="/profile">{signInOrProfile}</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
