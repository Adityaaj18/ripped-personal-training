"use server";
import { Databases, ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  database,
  DATABSE_ID,
  ENDPOINT,
  PROJECT_ID,
  CUSTOMER_COLLECTION_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite";
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerCustomer = async ({
  identificationDocument,
  ...customer
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        Buffer.from(
          await (identificationDocument?.get("blobFile") as Blob).arrayBuffer()
        ),
        identificationDocument?.get("fileName") as string
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newCustomer = await database.createDocument(
      DATABSE_ID!,
      CUSTOMER_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...customer,
      }
    );

    return parseStringify(newCustomer)
  } catch (error) {
    console.log(error);
  }
};
