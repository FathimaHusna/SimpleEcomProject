import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email === user?.email && form.password === user?.password) {
      dispatch(login(form));
      console.log("Login Successful!");
      alert("Login Successful!");
    } else {
      console.log("Validation error: Incorrect email or password");
      alert("Invalid Email or Password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>

        <p className="text-sm text-gray-600 text-center mt-4">
          Do not have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Sign up here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
