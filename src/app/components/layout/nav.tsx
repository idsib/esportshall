"use client";

import Image from "next/image";
import Link from "next/link";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/theme-context";
import { useSession } from "next-auth/react";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-dark-100/70 backdrop-blur-md border-b border-gray-200 dark:border-dark-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/esportshall.png"
              alt="EsportsHall Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="font-bold text-gray-900 dark:text-white">
              EsportsHall
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-brand-yellow" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {!session && (
              <Link href="/auth/login" className="btn-primary">
                Empezar Ahora
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

              