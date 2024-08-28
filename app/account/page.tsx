import SignIn from "../_components/SignIn";
import SignOut from "../_components/SignOut";
import { auth } from "../_lib/auth";

export default async function Account() {
  const session = await auth();
  const user = session?.user;

  if (!session) {
    return <SignIn />;
  }
  return (
    <div className=" flex justify-center items-center w-full h-screen">
      <div className="flex justify-around  gap-8">
        <h1 className="text-3xl py-4">Log as {user?.name}</h1>
        <SignOut />
      </div>
    </div>
  );
}
