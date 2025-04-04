"use client";

import React from "react";

export default function Page({ params }) { 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile page</h1>
      <h1>{params.id}</h1>
    </div>
  );
}
