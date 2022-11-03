import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Header from "./components/Header";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Category from "./pages/Category";
import Listing from "./pages/Listing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./components/PrivateRoute";
import AppFooter from "./components/AppFooter";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<PrivateRoute path="/signin" />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/category/:categoryName/:id" element={<Listing />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route
              path="/create-listing"
              element={<PrivateRoute path="/signin" />}
            >
              <Route path="/create-listing" element={<CreateListing />} />
            </Route>
            <Route
              path="/edit-listing"
              element={<PrivateRoute path="/signin" />}
            >
              <Route path="/edit-listing/:id" element={<EditListing />} />
            </Route>
          </Routes>
        </div>
        <AppFooter />
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
