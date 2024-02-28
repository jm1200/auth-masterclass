"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import React from "react";

const Client = () => {
  const user = useCurrentUser();
  console.log(
    "File: ~/Documents/Projects/Tutorials/auth-tutorial/app/(protected)/server/page.tsx, Line: 8",
    user
  );
  return <UserInfo user={user} label="📱 Client Component" />;
};

export default Client;
