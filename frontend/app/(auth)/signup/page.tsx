"use client";
import React, { useState } from "react";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name,
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
      <form
        className="w-1/2 flex flex-col h-full justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="logincontainer border-1 border-gray-300 p-3 rounded-xl shadow-md flex flex-col justify-center items-center w-3/5 gap-10 py-10">
          <p className="text-3xl font-bold">Sign up</p>
          <input
            type="text"
            className="bg-gray-100 rounded p-1 w-full"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
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
            Create account
          </button>
          <p className="text-gray-500">
            Have an account?{" "}
            <a href="/login" className="text-blue-900">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
