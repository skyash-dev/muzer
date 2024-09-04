import AppNavbar from "./components/AppNavbar";

export default function Home() {
  return (
    <main className="">
      <LandingPage></LandingPage>
    </main>
  );
}

import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Redirect } from "./components/Redirect";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <AppNavbar></AppNavbar>
      <Redirect />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-6 text-purple-400">
            Your Stream, Their Beats
          </h1>
          <p className="text-xl mb-8 max-w-md mx-auto">
            Let your audience shape the soundtrack of your stream with muzer.
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <div className="flex items-center bg-green-500 bg-opacity-20 rounded-full px-4 py-2">
              <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
              <span>Upvote</span>
            </div>
            <div className="flex items-center bg-red-500 bg-opacity-20 rounded-full px-4 py-2">
              <ThumbsDown className="h-5 w-5 text-red-500 mr-2" />
              <span>Downvote</span>
            </div>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold">
            Start Streaming Now
          </Button>
        </div>
      </main>
      <footer className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2023 muzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
