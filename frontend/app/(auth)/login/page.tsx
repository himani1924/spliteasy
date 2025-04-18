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
    <div className="container flex flex-row w-full h-screen">
      <div className="bg-blue-900 w-2/3 flex flex-col h-full justify-center items-center text-white text-5xl font-bold rounded-r-full">
        Hello, welcome
      </div>
      <div
        onSubmit={handleSubmit}
        className="w-1/2 flex flex-col h-full justify-center items-center"
      >
        <form className="logincontainer border-1 border-gray-300 p-3 rounded-xl shadow-md flex flex-col justify-center items-center w-3/5 gap-10 py-10">
          <p className="text-3xl font-bold">Login</p>
          <input
            type="text"
            className="bg-gray-100 rounded p-1 w-full"
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
            className="bg-gray-100 rounded p-1 w-full"
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
            className="w-full bg-blue-900 text-white font-bold py-2 rounded"
          >
            Login
          </button>
          <p className="text-gray-500">
            Dont have an account?{" "}
            <a href="/signup" className="text-blue-900">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
