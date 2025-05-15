"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import MainLayout from "./components/layout/mainLayout";
import { MessageSquare, Heart, MoreHorizontal, Repeat2 } from "lucide-react";
import { useTheme } from "../../context/theme-context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {AllNoticias} from "../auth/neon/actionsServer";

interface Tweet {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  retweets: number;
}

const initialTweets: Tweet[] = [
  {
    id: 1,
    user: {
      name: "EsportsHall",
      username: "@esportshall",
      avatar: "/images/esportshall.png",
    },
    content: "¡Nuevo torneo de League of Legends anunciado! 🎮",
    timestamp: "2h",
    likes: 42,
    replies: 12,
    retweets: 8,
  },
];

export default function MainPage() {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();
  const userImage = session?.user?.image || '/images/esportshall.png';
  const [tweets] = useState<Tweet[]>(initialTweets);

  // Comentamos la redirección para permitir el acceso sin sesión
  // useEffect(() => {
  //   if (!session) {
  //     router.push('/auth/login');
  //   }
  // }, [session, router]);

  // Permitimos renderizar la página incluso sin sesión
  // if (!session) {
  //   return null;
  // }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        {/* Tweet Composer */}
        <div className={`p-4 ${theme === 'dark' ? 'bg-dark-200/95' : 'bg-white'}`}>
          <div className="flex gap-4">
            <div className="relative w-12 h-12">
              <Image
                src={userImage}
                alt="Profile"
                className="rounded-full object-cover"
                fill
                sizes="48px"
                priority
              />
            </div>
            <div className="flex-1">
              <textarea
                placeholder="¿Qué está pasando en el mundo de los esports?"
                className={`w-full bg-transparent border-none focus:outline-none resize-none ${theme === 'dark'
                    ? 'text-white placeholder-neutral-500'
                    : 'text-gray-900 placeholder-gray-500'
                  }`}
                rows={3}
              />
              <div className="flex justify-between items-center pt-4">
                <div className="ml-auto">
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-500">
                    Postear
                  </button>
                </div>
                <button onClick={() => AllNoticias()}> pruebita</button>
              </div>
            </div>
          </div>
        </div>

        {/* Tweet Feed */}
        <div>
          {tweets.map((tweet) => (
            <div
              key={tweet.id}
              className={`p-4 ${theme === 'dark'
                  ? 'hover:bg-dark-300/50 bg-dark-200/95'
                  : 'hover:bg-gray-50 bg-white'
                }`}
            >
              <div className="flex gap-4">
                <div className="relative w-12 h-12">
                  <Image
                    src={tweet.user.avatar}
                    alt={tweet.user.name}
                    className="rounded-full object-cover"
                    fill
                    sizes="48px"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900 font-bold'}>
                      {tweet.user.name}
                    </span>
                    <span className={theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}>
                      {tweet.user.username}
                    </span>
                    <span className={theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}>·</span>
                    <span className={theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}>
                      {tweet.timestamp}
                    </span>
                    <button className={`ml-auto ${theme === 'dark'
                        ? 'text-neutral-500 hover:text-yellow-400'
                        : 'text-gray-500 hover:text-yellow-500'
                      }`}>
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {tweet.content}
                  </p>
                  <div className="flex gap-6 mt-4">
                    <button className={`flex items-center gap-2 ${theme === 'dark'
                        ? 'text-neutral-500 hover:text-yellow-400'
                        : 'text-gray-500 hover:text-yellow-500'
                      }`}>
                      <MessageSquare size={20} />
                      <span>{tweet.replies}</span>
                    </button>
                    <button className={`flex items-center gap-2 ${theme === 'dark'
                        ? 'text-neutral-500 hover:text-yellow-400'
                        : 'text-gray-500 hover:text-yellow-500'
                      }`}>
                      <Heart size={20} />
                      <span>{tweet.likes}</span>
                    </button>
                    <button className={`flex items-center gap-2 ${theme === 'dark'
                        ? 'text-neutral-500 hover:text-yellow-400'
                        : 'text-gray-500 hover:text-yellow-500'
                      }`}>
                      <Repeat2 size={20} />
                      <span>{tweet.retweets}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 