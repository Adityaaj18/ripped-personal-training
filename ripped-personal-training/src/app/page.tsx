"use client";
import { Button } from "@/components/ui/button";
import CustomerForm from "@/components/ui/forms/CustomerForm"
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* {todo: otp verification} */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full2.svg"
            height={1000}
            width={1000}
            alt="ripped"
            className="mb-12 h-10 w-fit"
          />
          <CustomerForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 Ripped
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img2.jpg"
        height={1000}
        width={1000}
        alt="Ripped"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
