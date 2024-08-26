"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleEmailSignIn = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await signIn("credentials", {
      redirect: true, // Redirect after sign in
      email,
      password,
      callbackUrl: "/account", // Redirect to the account page after login
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <p>Please log in to view your account.</p>

      {/* Google Sign In */}
      <button
        className="bg-customLight text-customDark mt-3 h-10 w-24 shadow-md rounded-sm"
        onClick={() => signIn("google", { callbackUrl: "/account" })}
      >
        Sign In with Google
      </button>

      {/* Email Sign In */}
      <form
        onSubmit={handleEmailSignIn}
        className="mt-4 flex flex-col items-center"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="p-2 border-b-2 border-gray-300 focus:outline-none focus:border-customDark mt-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="p-2 border-b-2 border-gray-300 focus:outline-none focus:border-customDark mt-2"
        />
        <button
          type="submit"
          className="bg-customLight text-customDark mt-3 h-10 w-24 shadow-md rounded-sm"
        >
          Sign In with Email
        </button>
      </form>
    </div>
  );
}
