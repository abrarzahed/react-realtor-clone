import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebasee";
import Spinner from "../components/Spinner";

export default function Profile() {
  // auth
  const auth = getAuth();

  // navigation
  const navigation = useNavigate();

  // states
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [isSpinning, setIsSpinning] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  // apply tailwind common classes to inputs
  const applyClasses = () => {
    return "w-full text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out";
  };

  // spreading state variables to use further
  const { name, email } = formData;

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

  // handle profile update
  const handleUpdateProfile = async () => {
    if (isDisabled) {
      setIsDisabled(false);
    } else {
      try {
        setIsSpinning(true);
        if (auth.currentUser.displayName !== "name") {
          // update display name in firebase authentication
          await updateProfile(auth.currentUser, {
            displayName: name,
          });

          // update user profile data in firebase firestore
          const docRef = doc(db, "users", auth.currentUser.uid);
          await updateDoc(docRef, {
            name,
          });
        }
        toast.success("Profile is updated");
        setIsDisabled(true);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsSpinning(false);
      }
    }
  };

  // sign out function
  const handleSignOut = () => {
    auth.signOut();

    //  redirect to home page
    navigation("/");
  };

  return (
    <section className="mt-8 max-w-6xl mx-auto">
      {isSpinning && <Spinner />}
      <h1 className="text-3xl text-gray-700 text-center font-bold">
        My profile
      </h1>
      <form className="my-6 p-3 w-full md:w-[50%] mx-auto">
        <input
          disabled={isDisabled}
          placeholder="Name"
          name="name"
          className={`${applyClasses()} mb-6 ${
            !isDisabled ? "bg-blue-100" : "white"
          }`}
          type="text"
          value={name}
          onChange={(e) => handleInputChange(e)}
        />
        <input
          disabled
          placeholder="Email"
          name="email"
          className={`${applyClasses()} mb-6`}
          type="email"
          value={email}
          onChange={(e) => handleInputChange(e)}
        />

        <div className="flex justify-between items-center text-sm sm:text-lg">
          <p>
            <span className="text-gray-600">
              Do you want to change your name?
            </span>{" "}
            <span
              className={`text-red-600 cursor-pointer font-semibold`}
              onClick={handleUpdateProfile}
            >
              {isDisabled ? "Edit" : "Save change"}
            </span>
          </p>
          <p
            onClick={handleSignOut}
            className="cursor-pointer text-blue-600 font-semibold"
          >
            Sign out
          </p>
        </div>
      </form>
    </section>
  );
}
