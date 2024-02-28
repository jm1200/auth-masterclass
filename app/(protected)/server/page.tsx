import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const Server = async () => {
  const user = await currentUser();
  console.log(
    "File: ~/Documents/Projects/Tutorials/auth-tutorial/app/(protected)/server/page.tsx, Line: 7 server user",
    { user }
  );

  return <UserInfo user={user} label="💻 Server Component" />;
};

export default Server;
