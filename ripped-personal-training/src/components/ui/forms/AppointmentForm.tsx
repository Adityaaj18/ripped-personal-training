"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../../SubmitButton";
import { useState } from "react";
import {
  CreateAppointmentSchema,
  getAppointmentSchema,
} from "@/lib/validation";
import { create } from "domain";
import { useRouter } from "next/navigation";
import { createUser } from "../../../../lib/actions/customer.actions";
import { FormFieldType } from "./CustomerForm";
import { Trainers } from "../../../../constants";
import { SelectItem } from "../select";
import Image from "next/image";
import {
  createAppointment,
  deleteAppointment,
  updateAppointment,
} from "../../../../lib/actions/appointment.actions";
import { Appointment } from "../../../../types/appwrite.types";

const AppointmentForm = ({
  userId,
  customerId,
  type,
  appointment,
  setOpen,
}: {
  userId: string;
  customerId: string;
  type: "create" | "cancel" | "schedule" | "delete";
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const AppointmentFormValidation = getAppointmentSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryTrainer: appointment ? appointment.primaryTrainer : "",
      schedule: appointment
        ? new Date(appointment?.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      case "delete":
        status = "deleted";
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "delete") {
        const deletedAppointment = await deleteAppointment({
          appointmentId: appointment?.$id!,
        });
        if (deletedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      } else if (type === "create" && customerId) {
        const appointmentData = {
          userId,
          customer: customerId,
          primaryTrainer: values.primaryTrainer,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };
        const appointment = await createAppointment(appointmentData);
        if (appointment) {
          form.reset();
          router.push(
            `/customers/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          appointment: {
            primaryTrainer: values?.primaryTrainer,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
      //delete
      // else if (type === "delete") {
      //   const deletedAppointment = await deleteAppointment({
      //     appointmentId: appointment?.$id!,
      //   });
      //   if (deletedAppointment) {
      //     setOpen && setOpen(false);
      //     form.reset();
      //   }
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    case "delete":
      buttonLabel = "Delete Appointment";
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment within few clicks
            </p>
          </section>
        )}
        {type === "create" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryTrainer"
              label="Trainer"
              placeholder="Select your trainer"
            >
              {Trainers.map((trainer) => (
                <SelectItem key={trainer.name} value={trainer.name}>
                  <div className="flex curson-pointer items-center gap-2">
                    <Image
                      src={trainer.image}
                      width={32}
                      height={32}
                      alt={trainer.name}
                      className="rounded full border border-dark-500"
                    />
                    <p>{trainer.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="What's your goal? (to loose weight, build muscle, etc.)"
                placeholder="Enter your goal"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Notes"
                placeholder="Enter notes"
              />
            </div>
          </>
        )}
        {type === "schedule" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryTrainer"
              label="Trainer"
              placeholder="Select your trainer"
            >
              {Trainers.map((trainer) => (
                <SelectItem key={trainer.name} value={trainer.name}>
                  <div className="flex curson-pointer items-center gap-2">
                    <Image
                      src={trainer.image}
                      width={32}
                      height={32}
                      alt={trainer.name}
                      className="rounded full border border-dark-500"
                    />
                    <p>{trainer.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="What's your goal? (to loose weight, build muscle, etc.)"
                placeholder="Enter your goal"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Notes"
                placeholder="Enter notes"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Enter reason for cancellation"
          />
        )}

        {type === "delete" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="deleteAppointment"
            // label="Reason for cancellation"
            placeholder="Enter reason for cancellation (optional)"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          // className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
          className={`${(type === "cancel" && "shad-danger-btn") || (type === "create" && "shad-primary-btn") || (type === "schedule" && "shad-primary-btn") || (type === "delete" && "shad-danger-btn")} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
