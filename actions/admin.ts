"use server";
import { currentRole } from "@/lib/auth";
import { AuthActionReturn } from "@/types";
import { UserRole } from "@prisma/client";

export const admin = async (): Promise<AuthActionReturn> => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { error: "Forbidden server action!" };
  }

  return { success: "Allowed server action !" };
};
