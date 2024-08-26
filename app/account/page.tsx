import SignIn from "../_components/SignIn";
import { auth } from "../_lib/auth";

export default async function Account() {
  const session = await auth();
  console.log(session);

  return (
    <div className="flex justify-center">
      <SignIn />
    </div>
  );
}
