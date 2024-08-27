import SignIn from "../_components/SignIn";
import { auth } from "../_lib/auth";

export default async function Account() {
  const session = await auth();
  const user = session?.user;
  if (!session) {
    return <SignIn />;
  }
  return <div className="flex justify-center">Account</div>;
}
