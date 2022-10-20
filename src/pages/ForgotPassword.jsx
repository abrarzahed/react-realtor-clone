import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import Spinner from "../components/Spinner";

export default function ForgotPassword() {
  // states
  const [formData, setFormData] = useState({
    email: "",
  });

  const [isSpinning, setIsSpinning] = useState(false);

  const [loading, setLoading] = useState(false);
  const stopLoadingWithTiming = () => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  };

  // spreading state variables to use further
  const { email } = formData;

  // apply common tailwind classes for inputs
  const applyClasses = () => {
    return "w-full text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out";
  };

  // handle state changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // reset password function
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setIsSpinning(true);

      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent. Please check your email");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      stopLoadingWithTiming();

      // stop spinner
      setIsSpinning(false);
    }
  };

  return (
    <section className="px-4">
      {isSpinning && <Spinner />}
      <div className="flex justify-center items-center flex-wrap p-10 max-w-6xl mx-auto bg-white bg-opacity-70 shadow-md rounded-md mt-10">
        <div
          className="h-60 md:min-h-[420px] w-full rounded-md md:w-[58%] relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80')",
            backgroundSize: "cover",
          }}
        ></div>

        <div className="w-full mt-10 md:mt-0 md:w-[38%] md:ml-auto">
          <form onSubmit={handleResetPassword}>
            <input
              placeholder="Email address"
              name="email"
              className={`${applyClasses()} mb-6`}
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e)}
            />

            <div className="flex justify-between text-sm sm:text-md mb-6">
              <p>
                Don't have an account?
                <Link className="text-red-600" to="/signup">
                  {" "}
                  Register
                </Link>
              </p>
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 font-medium uppercase rounded shadow-md hover:bg-blue-800 transition duration-150 ease-in-out disabled:cursor-none disabled:bg-gray-200"
            >
              Submit
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
