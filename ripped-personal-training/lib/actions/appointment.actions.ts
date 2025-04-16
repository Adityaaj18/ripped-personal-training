"use server";
import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  CUSTOMER_COLLECTION_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  messaging,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import App from "next/app";
import { Appointment } from "../../types/appwrite.types";
import { revalidatePath } from "next/cache";
import { Content } from "next/font/google";
import { formatDateTime } from "../../lib/utils";

//create
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

//read

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppoitnmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCount += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCount += 1;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };
    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};

//update

export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment,
    );
    if (!updateAppointment) {
      throw new Error("Appointment not found");
    }

    console.log('sss', appointment);
    

    const smsMessage = `Hi, it's Ripped.
    ${type === "schedule" ? `Your appointment has been scheduled for ${formatDateTime(appointment.schedule!, timeZone).dateTime} with ${appointment.primaryTrainer}` : 
      `We regret to inform you that your appointment has been cancelled. Reason: ${appointment.cancellationResult}`}
    `;

    await sendSMSNotification(userId, smsMessage)

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(error);
  }
};

//delete
// export const deleteAppointment = async ({
//   appointmentId,
// }: {
//   appointmentId: string;
// }) => {
//   try {
//     const deleted = await databases.deleteDocument(
//       DATABASE_ID!,
//       APPOINTMENT_COLLECTION_ID!,
//       appointmentId
//     );

//     revalidatePath("/admin");
//     return { success: true, message: "Appointment deleted", data: deleted };
//   } catch (error) {
//     console.log(error);
//     return { success: false, message: "Failed to delete appointment", error };
//   }
// };

//SMS function
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );

    return parseStringify(message);
  } catch (error) {
    console.log(error);
  }
};
