import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedinIn,
  FaTwitterSquare,
} from "react-icons/fa";

export default function AppFooter() {
  return (
    <footer className="bg-slate-900 mt-16 py-6 px-3">
      <h3 className="text-xl text-gray-400 font-bold md:text-4xl uppercase text-center">
        <span className="text-red-600">Real</span>tor.Clone
      </h3>
      <div className="max-w-6xl my-6 justify-center items-center space-x-2 flex mx-auto text-white">
        <FaFacebookSquare className="bg-gray-400 cursor-pointer text-slate-800 rounded text-4xl p-2" />
        <FaInstagram className="bg-gray-400 cursor-pointer text-slate-800 rounded text-4xl p-2" />
        <FaLinkedinIn className="bg-gray-400 cursor-pointer text-slate-800 rounded text-4xl p-2" />
        <FaTwitterSquare className="bg-gray-400 cursor-pointer text-slate-800 rounded text-4xl p-2" />
      </div>
      <a
        className="text-gray-400 text-sm block text-center font-medium"
        href="mailto:abrarhussenzahed6986@gmail.com"
      >
        abrarhussenzahed6986@gmail.com
      </a>
    </footer>
  );
}
