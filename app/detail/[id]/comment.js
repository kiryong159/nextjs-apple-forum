"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Comment({ id, email, isDark }) {
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState([]);
  const onChange = (e) => {
    setComment(e.target.value);
  };
  const onClick = () => {
    fetch(`/api/post/comment`, {
      method: "POST",
      body: JSON.stringify({ comment, id }),
    })
      .then((response) => response.json())
      .then((r) => {
        setCommentData(r);
        setComment("");
      });
  };
  const commentDelBtn = (commentid) => {
    fetch("/api/post/commentDel", {
      method: "POST",
      body: JSON.stringify({ id, commentid }),
    })
      .then((r) => r.json())
      .then((r) => setCommentData(r));
  };

  useEffect(() => {
    fetch(`/api/post/commentData`, { method: "POST", body: id })
      .then((response) => response.json())
      .then((r) => setCommentData(r));
  }, []);
  return (
    <div
      className={` p-3 px-5 rounded-md py-5 ${
        isDark ? "bg-gray-500 text-white" : "bg-white"
      }`}
    >
      <div className="flex flex-col mb-3 space-y-4">
        {commentData.map((item) => {
          return (
            <div className="flex justify-between" key={item._id}>
              <span className="flex w-3/4">{item.comment}</span>
              <div className="flex items-center space-x-2 w-1/4 justify-end">
                {email === item.authoremail ? (
                  <div className="flex  items-center">
                    <Link href={`/detail/${item._id}/commentEdit`}>
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>

                    <button onClick={() => commentDelBtn(item._id)}>
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                ) : null}
                <span
                  className={`text-xs  ${
                    isDark ? "text-white" : "text-gray-500"
                  }`}
                >
                  {item.author}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="flex mt-3 space-x-3 text-sm">
        <input
          placeholder="댓글을 입력해주세요"
          className="bg-gray-100 shadow-md rounded-md w-3/4 px-2 py-1"
          value={comment}
          onChange={onChange}
        />
        <button
          onClick={onClick}
          className="w-1/4 bg-purple-300 rounded-md p-1 shadow-md"
        >
          전송
        </button>
      </div>
      <div className="mt-5 p-1 text-red-400 text-sm hidden"></div>
    </div>
  );
}
