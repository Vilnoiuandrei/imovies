import SignIn from "../_components/SignIn";
import SignOut from "../_components/SignOut";
import { auth } from "../_lib/auth";

export default async function Account() {
  const session = await auth();
  const user = session?.user;
  console.log(user);
  if (!session) {
    return <SignIn />;
  }
  return (
    <div className=" w-full">
      <div className="flex justify-around">
        <h1 className="text-3xl py-4">Welcome {user?.name}</h1>
        <SignOut />
      </div>
    </div>
  );
}
