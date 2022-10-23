import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Header from "./components/Header";
import CreateListing from "./pages/CreateListing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<PrivateRoute path="/signin" />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/offers" element={<Offers />} />
            <Route
              path="/create-listing"
              element={<PrivateRoute path="/signin" />}
            >
              <Route path="/create-listing" element={<CreateListing />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
