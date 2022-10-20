import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Spinner from "../components/Spinner";

export default function SignIn() {
  // states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const stopLoadingWithTiming = () => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  };

  const [isSpinning, setIsSpinning] = useState(false);

  // apply tailwind common classes to inputs
  const applyClasses = () => {
    return "w-full text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out";
  };

  // spreading state variables to use further
  const { email, password } = formData;

  // navigation
  const navigation = useNavigate();

  // handle state change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // sign in function
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setIsSpinning(true);
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        // success toast message
        toast.success("You are logged in");

        // redirect to home page
        navigation("/");
      }
    } catch (error) {
      // error toast message
      toast.error(error.message);
    } finally {
      // stop loading stage
      stopLoadingWithTiming();

      // stop spinner
      setIsSpinning(false);
    }
  };

  return (
    <section>
      {isSpinning && <Spinner />}
      <div className="flex justify-center items-center flex-wrap px-6 pt-12 pb-6 max-w-6xl mx-auto bg-white rounded-md mt-10">
        <div
          className="h-80 md:min-h-[420px] w-full rounded-md md:w-[67%] lg:w-[50%] mb-12 md:mb-6 mx-auto relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80')",
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-3xl absolute bg-white p-4 top-0 right-0 text-blue-700 mb-6 border-t border-r font-bold rounded-tr-md rounded-bl-md">
            Sign in
          </h1>
        </div>

        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-auto">
          <form onSubmit={handleSignIn}>
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
                Don't have an account?
                <Link className="text-red-600" to="/signup">
                  {" "}
                  Register
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
              Sign in
            </button>

            <div className="flex items-center text-center font-semibold my-4 before:w-full before:h-[2px] before:bg-gray-200 after:w-full after:h-[2px] after:bg-gray-200">
              <span className="mx-4">OR</span>
            </div>

            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
