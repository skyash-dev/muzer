"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Music } from "lucide-react";

export default function () {
  const session = useSession();
  return (
    <header className="border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Music className="h-6 w-6 text-purple-500" />
          <span className="text-xl font-bold">muzer</span>
        </Link>
        <nav>
          {session?.data?.user && (
            <Button
              variant="outline"
              className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-gray-900"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </Button>
          )}
          {!session?.data?.user && (
            <Button
              variant="outline"
              className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-gray-900"
              onClick={() => {
                signIn();
              }}
            >
              Sign In
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
