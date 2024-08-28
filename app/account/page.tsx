import SignIn from "../_components/SignIn";
import { auth } from "../_lib/auth";

export default async function Account() {
  const session = await auth();
  const user = session?.user;
  console.log(user);
  if (!session) {
    return <SignIn />;
  }
  return (
    <div className="flex justify-center">
      <h1 className="text-3xl py-4">Welcome {user?.name}</h1>
    </div>
  );
}
