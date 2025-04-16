
import { Button } from "@/components/ui/button";
import AppointmentForm from "@/components/ui/forms/AppointmentForm";
import CustomerForm from "@/components/ui/forms/CustomerForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getCustomer } from "../../../../../lib/actions/customer.actions";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const customer = await getCustomer(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full2.svg"
            height={1000}
            width={1000}
            alt="ripped"
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm 
            type="create"
            userId={userId}
            customerId={customer.$id}
          />

          <p className="copyright mt-10 py-12">
            © 2025 Ripped
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
