"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

//source: shadcn docs
import React from "react";
import StatusBadge from "../StatusBadge";
import { Appointment } from "../../../types/appwrite.types";
import { formatDateTime } from "../../../lib/utils";
import { Trainers } from "../../../constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.customer.name}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
  },

  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryTrainer",
    header: () => "Trainer",
    cell: ({ row }) => {
      const trainer = Trainers.find(
        (trainer) => trainer.name === row.original.primaryTrainer
      );
      return (
        <div className="flex items-center gap-3">
          <Image
            src={trainer?.image}
            alt={trainer.name}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">{trainer?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            customerId={data.customer.$id}
            userId={data.userId}
            appointment={data}
          />
          <AppointmentModal
            type="cancel"
            customerId={data.customer.$id}
            userId={data.userId}
            appointment={data}
          />
          <AppointmentModal
            type="delete"
            appointment={data}
          />
        </div>
      );
    },
  },
];
