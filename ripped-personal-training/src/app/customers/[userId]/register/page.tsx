import Image from "next/image";
import React from "react";
import Link from "next/link";
import RegisterForm from "@/components/ui/forms/RegisterForm";
import { getUser } from "../../../../../lib/actions/customer.actions"; 


const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  
  return (
    <div className="flex h-screen max-h-screen">
      {/* {todo: otp verification} */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full2.png"
            height={1000}
            width={1000}
            alt="ripped"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} />
          <p className="copyright py-12">
            © 2025 Ripped
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="Ripped"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
