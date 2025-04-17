"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import AppointmentForm from "./ui/forms/AppointmentForm";
import { Appointment } from "../../types/appwrite.types";

const AppointmentModal = ({
  type,
  customerId,
  userId,
  appointment,
}: {
  type: "schedule" | "cancel" | "delete";
  customerId: "string";
  userId: "string";
  appointment?: Appointment;
}) => {
  const [open, setOpen] = useState(false);
  console.log('type', type);
  
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className={`capitalize ${type === "schedule" ? "text-green-500" : "text-red-400"} `}
          >
            {type}
          </Button>
        </DialogTrigger>
        <DialogContent className="shad-dialog sm:max-w-md">
          <DialogHeader className="mb-4 space-y-3">
            <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
            <DialogDescription>
              Please fill in the following details to {type} an appointment.
            </DialogDescription>
          </DialogHeader>
          <AppointmentForm
            userId={userId}
            customerId={customerId}
            type={type}
            appointment={appointment}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentModal;
