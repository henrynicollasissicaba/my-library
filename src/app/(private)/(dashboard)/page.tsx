import { currentUser } from "@clerk/nextjs/server";
import * as User from "@/models/User"

export default async function Home() {
  const clerkUser = await currentUser()
  if(!clerkUser) return 

  const userData = {
    id: clerkUser.id,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    email: clerkUser.emailAddresses[0].emailAddress || ""
  }

  const user = await User.getUser(userData)

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>user.id: {user?.id}</h1>
      <h1>first name: {user?.firstName}</h1>
      <h1>last name: {user?.lastName}</h1>
      <h1>email: {user?.email}</h1>
    </div>
  );
}
