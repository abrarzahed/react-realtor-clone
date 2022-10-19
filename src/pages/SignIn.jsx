import { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const applyClasses = () => {
    return "w-full text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClick = () => {
    setShowPassword((prev) => (prev = !prev));
  };

  const { email, password } = formData;

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign in</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 mx-auto">
          <img
            className="w-full rounded-md"
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
            alt="key"
          />
        </div>

        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-10">
          <form>
            <input
              placeholder="Email address"
              name="email"
              className={applyClasses()}
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e)}
            />
            <div>
              <input
                placeholder="Password"
                name="password"
                className={applyClasses()}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handleInputChange(e)}
              />
              <div onClick={handleClick}>👁</div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
