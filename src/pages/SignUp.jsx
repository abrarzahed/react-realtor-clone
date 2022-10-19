import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebasee";
import { serverTimestamp, setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  // states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const stopLoadingWithTiming = () => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  };

  const [showPassword, setShowPassword] = useState(false);

  // returning common tailwind classes for inputs
  const applyClasses = () => {
    return "w-full text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out";
  };

  // handling state changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // spreading state variables to use further
  const { name, email, password } = formData;

  // navigation
  const navigation = useNavigate();

  // sign up function
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (name.length < 1) {
        throw new Error("Invalid username");
      }
      const auth = getAuth();
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // updating username
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // get user info
      const user = res.user;

      // creating user object after removing password and after adding timestamp
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timstamp = serverTimestamp();

      // sending user data to "users" collection in database
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef, formDataCopy);
      // if document not exist add to the users's collection
      if (docSnap.exists()) {
        console.log("this user already exist");
        return;
      } else {
        await setDoc(docRef, formDataCopy);
      }

      // success toast message
      toast.success("Account has been created");

      // redirecting to home page
      navigation("/");
    } catch (error) {
      // error toast message
      toast.error(error.message);
    } finally {
      // stop loading
      stopLoadingWithTiming();
    }
  };

  return (
    <section>
      <div className="flex justify-center items-center flex-wrap px-6 pt-12 pb-6 max-w-6xl bg-white rounded-md mt-10">
        <div
          className="h-80 md:min-h-[460px] w-full rounded-md md:w-[67%] lg:w-[50%] mb-12 md:mb-6 mx-auto relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80')",
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-3xl absolute bg-white p-4 top-0 right-0 text-blue-700 mb-6 border-t border-r font-bold rounded-tr-md rounded-bl-md">
            Sign up
          </h1>
        </div>

        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-auto">
          <form onSubmit={handleSignUp}>
            <input
              placeholder="Enter full name"
              name="name"
              className={`${applyClasses()} mb-6`}
              type="text"
              value={name}
              onChange={(e) => handleInputChange(e)}
            />
            <input
              placeholder="Email address"
              name="email"
              className={`${applyClasses()} mb-6`}
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e)}
            />

            <div className="relative mb-6">
              <input
                placeholder="Password"
                name="password"
                className={applyClasses()}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handleInputChange(e)}
              />

              <span
                className="cursor-pointer absolute right-3 top-3 text-xl"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            <div className="flex justify-between text-sm sm:text-lg mb-6">
              <p>
                Already have an account?
                <Link className="text-red-600" to="/signin">
                  {" "}
                  Sign in
                </Link>
              </p>
              <p>
                <Link to="/forgot-password" className="text-blue-600">
                  {" "}
                  Forgot password?
                </Link>
              </p>
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 font-medium uppercase rounded shadow-md hover:bg-blue-800 transition duration-150 ease-in-out disabled:cursor-none disabled:bg-gray-200"
            >
              Sign up
            </button>

            <div className="flex items-center text-center font-semibold my-4 before:w-full before:h-[2px] before:bg-gray-200 after:w-full after:h-[2px] after:bg-gray-200">
              <span className="mx-4">OR</span>
            </div>
          </form>
          <OAuth />
        </div>
      </div>
    </section>
  );
}
