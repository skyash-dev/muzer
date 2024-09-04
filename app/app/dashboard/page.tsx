"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music, ThumbsUp, ThumbsDown, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AppNavbar from "../components/AppNavbar";

// Helper function to extract video ID from YouTube URL
const getYouTubeId = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function Dashboard() {
  const [inputUrl, setInputUrl] = useState("");
  const [previewId, setPreviewId] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState("");
  const [queue, setQueue] = useState([
    {
      id: "dQw4w9WgXcQ",
      title: "Rick Astley - Never Gonna Give You Up",
      votes: 5,
    },
    { id: "L_jWHffIx5E", title: "Smash Mouth - All Star", votes: 3 },
    { id: "fJ9rUzIMcZQ", title: "Queen - Bohemian Rhapsody", votes: 4 },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
    const videoId = getYouTubeId(e.target.value);
    setPreviewId(videoId || "");
  };

  const handleAddToQueue = () => {
    if (previewId) {
      setQueue([...queue, { id: previewId, title: "New Video", votes: 0 }]);
      setInputUrl("");
      setPreviewId("");
    }
  };

  const handleVote = (id: string, amount: number) => {
    setQueue(
      queue
        .map((video) =>
          video.id === id ? { ...video, votes: video.votes + amount } : video
        )
        .sort((a, b) => b.votes - a.votes)
    );
  };

  const playNext = () => {
    if (queue.length > 0) {
      setCurrentVideoId(queue[0].id);
      setQueue(queue.slice(1));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <AppNavbar></AppNavbar>

      <main className="container mx-auto px-4 flex-grow flex flex-col lg:flex-row gap-6 py-2">
        <div className="lg:w-3/5 space-y-6">
          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
            {currentVideoId ? (
              <iframe
                width="100%"
                height="100%"
                src={``}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400">No video playing</p>
              </div>
            )}
          </div>
          <Button
            onClick={playNext}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Play Next
          </Button>
        </div>

        <div className="lg:w-1/3 space-y-6">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter YouTube URL"
              value={inputUrl}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Button
              onClick={handleAddToQueue}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!previewId}
            >
              Add to Queue
            </Button>
          </div>

          {previewId && (
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={``}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Queue</h2>
            <ul className="space-y-4">
              {queue.map((video) => (
                <li key={video.id} className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <Image
                      src={``}
                      alt={video.title}
                      width={60}
                      height={45}
                      className="rounded"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 truncate block"
                    >
                      {video.title}
                    </a>
                    <div className="flex items-center space-x-2 mt-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleVote(video.id, 1)}
                      >
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                      </Button>
                      <span>{video.votes}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleVote(video.id, -1)}
                      >
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
