"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Signup failed", error.message || error);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label className="flex flex-col items-center justify-center">
        Username
      </label>
      <input
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
        type="text"
        className="text-gray-900 mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
      />
      <label className="flex flex-col items-center justify-center">Email</label>
      <input
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        type="text"
        className="text-gray-900 mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
      />
      <label className="flex flex-col items-center justify-center">
        Password
      </label>
      <input
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        type="password"
        className="text-gray-900 mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
      />
      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Sign up
      </button>

      <Link href="/login">Log in</Link>
    </div>
  );
}
