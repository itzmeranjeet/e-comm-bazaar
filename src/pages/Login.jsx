import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg";
import { useAuth } from "../components/Cart/AuthContext";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error("Login failed");
      setError("Invalid email or password.");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className=" flex justify-center mb-8">
            <h2 className=" text-xl font-medium "> Rebbit</h2>
          </div>
          <h2 className=" text-2xl font-bold text-center mb-6"> Hey there</h2>
          <p className=" text-center mb-6">
            {" "}
            Enter your email and password to sign in{" "}
          </p>
          <div className=" mb-4">
            <label htmlFor="" className=" block text-sm font-semibold mb-2">
              Email{" "}
            </label>
            <input
              type="text"
              className=" border rounded p-2 w-full"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className=" mb-4">
            <label htmlFor="" className=" block text-sm font-semibold mb-2">
              Password{" "}
            </label>
            <input
              type="password"
              className=" border rounded p-2 w-full"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className=" w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition "
          >
            {loading ? <ClipLoader size={20} color="#ffffff" /> : "Sign In"}
          </button>
          <p className=" mt-5 text-center text-sm">
            {" "}
            Don't have an account
            <Link to="/register" className=" text-blue-500">
              {" "}
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <div className=" hidden md:block w-6/12 ">
        <div className="h-full flex flex-col justify-center items-center ">
          <img
            src={loginImg}
            alt=""
            className=" h-[450px] w-full object-cover mr-3  -mt-10 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
