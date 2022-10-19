import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { serverTimestamp, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebasee";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function OAuth() {
  // states
  const [loading, setLoading] = useState(false);

  // navigation hook initialization
  const navigation = useNavigate();

  const stopLoadingWithTiming = () => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  };

  // sign in / up with google function
  const handleGoogleClick = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // if document not exist add to the users's collection
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      // success toast message
      toast.success("Successfully signed in");

      // push to the home page
      navigation("/");
    } catch (error) {
      // error toast message
      toast.error(error.message);
    } finally {
      // stop loading stage of button
      stopLoadingWithTiming();
    }
  };
  return (
    <button
      disabled={loading}
      onClick={handleGoogleClick}
      className="flex w-full bg-red-600 text-white p-3 rounded shadow-md hover:bg-red-800 transition duration-150 ease-in-out font-medium justify-center uppercase items-center mb-0 disabled:cursor-none disabled:bg-gray-200"
    >
      <FcGoogle className="mr-2 p-1 rounded-full bg-white text-2xl" /> Continue
      with google
    </button>
  );
}
