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
    <div className="flex flex-col lg:flex-row h-screen w-screen">
  {/* Left Panel */}
  <div className="hidden lg:flex w-1/2 h-full rounded-r-full bg-blue-900 items-center justify-center">
    <p className="text-white text-5xl font-bold text-center px-8">
      Hello, welcome
    </p>
  </div>

  {/* Right Panel */}
  <div className="flex w-full lg:w-1/2 h-full items-center justify-center bg-white px-6">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md border border-gray-300 p-8 rounded-2xl shadow-lg flex flex-col gap-6 bg-white"
    >
      <h2 className="text-4xl font-extrabold text-center text-blue-900">Sign up</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-900 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition"
      >
        Create Account
      </button>

      <p className="text-center text-gray-600 text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-blue-900 font-medium hover:underline">
          Log in
        </a>
      </p>
    </form>
  </div>
</div>

  );
};

export default SignupPage;

