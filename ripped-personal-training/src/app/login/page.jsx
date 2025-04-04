"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data);
      router.push("/profile");
    } catch (error) {
      console.log("Login failed", error.message || error);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

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
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Log in
      </button>

      <Link href="/signup">Sign up</Link>
    </div>
  );
}
