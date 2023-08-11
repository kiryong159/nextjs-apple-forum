"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ListMap({ result, isDark }) {
  const router = useRouter();
  const onClick = (id, e) => {
    fetch(`/api/post/delete?id=${id}`, { method: "DELETE" })
      .then((r) => {
        return r.json();
      })
      .then(() => {
        e.target.parentElement.parentElement.style.opacity = 0;
        setTimeout(() => {
          e.target.parentElement.parentElement.style.display = "none";
        }, 500);
      })
      .then(router.refresh());
  };
  console.log("리스트 isDark?", isDark);
  return (
    <div
      className={`max-w-lg mx-auto rounded-md space-y-2 py-20 px-3  ${
        isDark ? "bg-gray-400" : "bg-blue-300"
      }`}
    >
      {result.map((item) => {
        return (
          <div
            className={`p-6  rounded-md shadow-md flex flex-col space-y-3 opacity-100 transition-all ${
              isDark ? "bg-gray-300" : "bg-white"
            }`}
            key={item._id}
          >
            <Link href={`/detail/${item._id}`} className=" space-y-3">
              <h4 className="text-2xl font-bold">{item.title}</h4>
              <p className=" text-lg text-gray-500">{item.content}</p>
            </Link>
            <div className="flex justify-end">
              <button onClick={(e) => onClick(item._id, e)} className="w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
