"use client";

import Link from "next/link";
import Image from "next/image"
import { useSession } from "next-auth/react";
import { useState } from "react";

export function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/home" className="flex items-center">
                <Image
                  src="/assets/img/redect.png"
                  alt="Logo RedeCT"
                  width={50}
                  height={50}
                />
              <span className="text-xl font-bold text-[#BE382A] ml-2">RedeCT</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link href="/home" className="text-gray-700 hover:text-[#BE382A]">
              Home
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-[#BE382A]">
              Sobre
            </Link>
            <Link href="/noticias" className="text-gray-700 hover:text-[#BE382A]">
              Notícias
            </Link>
            <Link href="/portfolio" className="text-gray-700 hover:text-[#BE382A]">
              Portfólio
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-[#BE382A]">
              Contato
            </Link>
            {session ? (
              <Link
                href="/members"
                className="text-gray-700 hover:text-[#BE382A]"
              >
                Área de Membros
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-[#BE382A] text-white px-4 py-2 rounded-md hover:bg-[#A32E22]"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#BE382A] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                href="/home"
                className="block px-3 py-2 text-gray-700 hover:text-[#BE382A]"
              >
                Home
              </Link>
              <Link
                href="/sobre"
                className="block px-3 py-2 text-gray-700 hover:text-[#BE382A]"
              >
                Sobre
              </Link>
              <Link
                href="/noticias"
                className="block px-3 py-2 text-gray-700 hover:text-[#BE382A]"
              >
                Notícias
              </Link>
              <Link
                href="/portfolio"
                className="block px-3 py-2 text-gray-700 hover:text-[#BE382A]"
              >
                Portfólio
              </Link>
              <Link
                href="/contato"
                className="block px-3 py-2 text-gray-700 hover:text-[#BE382A]"
              >
                Contato
              </Link>
              {session ? (
                <Link
                  href="/members"
                  className="block px-3 py-2 text-gray-700 hover:text-[#BE382A]"
                >
                  Área de Membros
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-[#BE382A]"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 