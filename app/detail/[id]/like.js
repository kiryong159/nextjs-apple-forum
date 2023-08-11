"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Like({ likecount, postid, session, isDark }) {
  const [like, setLike] = useState(likecount);
  const router = useRouter();
  const onClick = () => {
    fetch("/api/post/like", { method: "POST", body: postid })
      .then((r) => r.json())
      .then((r) => {
        setLike(r);
        router.refresh();
      });
  };
  return (
    <button
      onClick={onClick}
      disabled={!session}
      className={`flex justify-between  rounded-lg px-3 py-1 space-x-2 items-center disabled:opacity-30 ${
        isDark ? "bg-gray-500" : "bg-white"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <span>{like}</span>
    </button>
  );
}
