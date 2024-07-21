"use server";

import { connectTODatabase } from "../database/mongoose";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
export async function createUser(user: CreateUserParams) {
  try {
    await connectTODatabase();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectTODatabase();
    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectTODatabase();
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });
    if(!updatedUser) throw new Error("User not found");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectTODatabase();
    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) throw new Error("User not found");
    const deletedUser = await User.findOneAndDelete(userToDelete._id);
    revalidatePath("/");
    if(!deletedUser) throw new Error("User not found");
    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    handleError(error);
  }
}