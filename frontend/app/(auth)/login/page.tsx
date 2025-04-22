"use client";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    console.log(data);
  };
  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen">
      <div className="hidden lg:flex w-1/2 h-full rounded-r-full bg-blue-900 items-center justify-center">
      <p className="text-white text-5xl font-bold text-center px-8">
        Hello, welcome
      </p>
      </div>
      <div className=" flex w-full lg:w-1/2 h-full items-center justify-center bg-white px-6"
      >
        <form className="w-full max-w-md border border-gray-300 p-8 rounded-2xl shadow-lg flex flex-col gap-6 bg-white" onSubmit={handleSubmit}>
          <p className="text-4xl font-extrabold text-center text-blue-900">Login</p>
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email Id"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="password"
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Login
          </button>
          <p className="text-gray-500">
            Dont have an account?{" "}
            <a href="/signup" className="text-blue-900 font-medium hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
