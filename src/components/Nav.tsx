import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import useDarkMode from "@/utils/useDarkMode";
import { useState } from "react";
import { DiscordProfile } from "next-auth/providers/discord";

export default function Nav() {
  const [colorTheme, setTheme] = useDarkMode();
  const { data: session } = useSession();
  const [showed, setShowed] = useState(false);

  const imgSize = 32;

  return (
    <header className="shadow-md border-none bg-[#E3E5E8] dark:bg-[#23272a]">
      <nav className="text-2xl font-semibold content flex py-1">
        <Link href="/">
          <a className="ml-1 transition-colors duration-200 pl-1 pr-2 py-0 hover:bg-neutral-400 dark:hover:bg-neutral-700 rounded-md">
            <h1 className=" text-2xl font-semibold flex py-2 items-center">
              <Image src="/logo.png" width={imgSize} height={imgSize} />
              TreeofLinks
            </h1>
          </a>
        </Link>
        <span className="block order-2 ml-auto">
          <div className="cursor-pointer">
            {colorTheme === "light" ? (
              <svg
                onClick={() => setTheme("light")}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className={`w-8 h-8 mt-2 absolute ${
                  session ? "right-14" : ""
                } transition-colors duration-200 py-1 hover:bg-neutral-700 rounded-md`}
                role="button"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                onClick={() => setTheme("dark")}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className={`w-8 h-8 mt-2 absolute ${
                  session ? "right-14" : ""
                } transition-colors duration-200 py-1 hover:bg-neutral-400 rounded-md`}
                role="button"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            )}
          </div>
          {session ? (
            <>
              <img
                src={session.user?.image as string}
                className="absolute right-0 h-[2.8rem] mr-1 ml-10 mt-[0.15rem] rounded-full cursor-pointer"
                onClick={() => setShowed((prev) => !prev)}
              />
              <div
                className={`${
                  showed ? "absolute" : "hidden"
                } right-0 mt-16 mr-2 w-56 origin-top-right divide-y divide-gray-50 dark:divide-gray-500 bg-[#E3E5E8] dark:bg-[#23272a] rounded-md transition-all duration-200 text-sm`}
              >
                <div
                  className="py-2 text-gray-700 dark:text-white block px-4 font-regular"
                  role="none"
                >
                  <span className="font-light">Logged in as</span>
                  <br />
                  <span className="font-bold text-xl mt-2">
                    {session.user.name + "#" + session.user.discriminator}
                  </span>
                </div>
                <div className="py-1" role="none">
                  <Link href={`/user/${session.user.id}`}>
                    <a className="text-gray-700 dark:text-white block px-4 py-2">
                      View Profile
                    </a>
                  </Link>
                  <Link href="/account/settings">
                    <a className="text-gray-700 dark:text-white block px-4 py-2">
                      Settings
                    </a>
                  </Link>
                </div>
                <div className="py-1" role="none">
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="text-gray-700 dark:text-white block px-4 py-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={() => signIn("discord")}
              type="button"
              className="text-xl mt-[0.35rem] mr-2 ml-10 px-3 py-1 transition-colors duration-200 rounded-md bg-green-600 hover:bg-green-700"
            >
              Login
            </button>
          )}
        </span>
      </nav>
    </header>
  );
}
