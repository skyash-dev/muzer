"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function () {
  const session = useSession();
  return (
    <div>
      {session?.data?.user && (
        <button
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </button>
      )}
      {!session?.data?.user && (
        <button
          onClick={() => {
            signIn();
          }}
        >
          Login
        </button>
      )}
    </div>
  );
}
