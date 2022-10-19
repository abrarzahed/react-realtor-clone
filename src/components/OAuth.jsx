import { FcGoogle } from "react-icons/fc";
export default function OAuth() {
  return (
    <button className="flex w-full bg-red-600 text-white p-3 rounded shadow-md hover:bg-red-800 transition duration-150 ease-in-out font-medium justify-center uppercase items-center mb-0">
      <FcGoogle className="mr-2 p-1 rounded-full bg-white text-2xl" /> Continue
      with google
    </button>
  );
}
