"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoginBtn from "./join/LoginBtn";
import LogoutBtn from "./LogoutBtn";

export function Nav({ user, userimg, username, layoutCookie }) {
  const [btn, setBtn] = useState(false);
  useEffect(() => {
    const cookieCheck = ("; " + document.cookie).split("; ");
    let isDarkCheck = null;
    cookieCheck.forEach((item) => {
      if (item.includes("isDark=")) {
        isDarkCheck = item.split("=")[1] === "true" ? true : false;
        setBtn(isDarkCheck);
        console.log("(useEffect)현재 isDark?", isDarkCheck);
        router.refresh();
      }
    });
    if (isDarkCheck === null) {
      document.cookie = `isDark=false; max-age=864000`;
      router.refresh();
    }
  }, []);
  const router = useRouter();
  const pathName = usePathname();

  const themeChange = () => {
    const cookieCheck = ("; " + document.cookie).split("; ");
    let isDarkCheck = null;
    cookieCheck.forEach((item) => {
      if (item.includes("isDark=")) {
        isDarkCheck = item.split("=")[1] === "true" ? true : false;
        router.refresh();
      }
    });
    if (isDarkCheck === true) {
      document.cookie = `isDark=false; max-age=864000`;
      setBtn(false);
    } else {
      document.cookie = `isDark=true; max-age=864000`;
      setBtn(true);
    }

    router.refresh();
  };

  return (
    <div
      className={`flex items-center max-w-lg mx-auto p-10 space-x-3 font-bold mb-2 ${
        layoutCookie ? "bg-gray-500" : "bg-blue-300"
      }`}
    >
      <Link
        href="/"
        className={`shadow-sm ${
          pathName === "/"
            ? layoutCookie
              ? "text-purple-300"
              : " text-orange-500 "
            : layoutCookie
            ? "text-white"
            : "text-black"
        }`}
      >
        HOME
      </Link>
      <Link
        className={`shadow-sm ${
          pathName === "/list"
            ? layoutCookie
              ? "text-purple-300"
              : " text-orange-500 "
            : layoutCookie
            ? "text-white"
            : "text-black"
        }`}
        href="/list"
      >
        List
      </Link>
      {user ? (
        <Link
          className={`shadow-sm ${
            pathName === "/write"
              ? layoutCookie
                ? "text-purple-300"
                : " text-orange-500 "
              : layoutCookie
              ? "text-white"
              : "text-black"
          }`}
          href="/write"
        >
          Write
        </Link>
      ) : null}
      {user ? (
        <div className="flex space-x-2 items-center">
          <span className={`${layoutCookie ? "text-white" : "text-black"}`}>
            {username}
          </span>
          {userimg === undefined ? (
            <div className="flex p-1 w-8  h-8 rounded-md bg-purple-300 items-center justify-center">
              <span className="text-[10px]">NO IMG</span>
            </div>
          ) : (
            <img className="w-8 h-auto rounded-md" src={userimg} alt="avatar" />
          )}
          <LogoutBtn />
        </div>
      ) : (
        <>
          <LoginBtn layoutCookie={layoutCookie} />
          <Link
            className={`shadow-sm ${
              pathName === "/join"
                ? layoutCookie
                  ? "text-purple-300"
                  : " text-orange-500 "
                : layoutCookie
                ? "text-white"
                : "text-black"
            }`}
            href="/join"
          >
            Join
          </Link>
        </>
      )}
      <button onClick={themeChange}>{btn === true ? "🌞" : "🌙"}</button>
    </div>
  );
}
