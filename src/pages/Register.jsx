import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../assets/register.jpg";
import { useAuth } from "../components/Cart/AuthContext";
import { toast } from "sonner";
const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.email, form.password, form.name);
      toast.success("Registration successful");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed");
      alert(error.message);
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
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              value={form.email}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              className="border rounded p-2 w-full"
              placeholder="Enter your name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              value={form.name}
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
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
            />
          </div>
          <button
            type="submit"
            className=" w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition "
          >
            Sign Up
          </button>
          <p className=" mt-5 text-center text-sm">
            Already have an account?
            <Link to="/login" className=" text-blue-500">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
      <div className=" hidden md:block w-6/12">
        <div className="h-full flex flex-col justify-center items-center ">
          <img
            src={registerImg}
            alt=""
            className=" h-[550px] w-full object-cover mr-3 -mt-8 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
