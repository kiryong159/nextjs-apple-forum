"use client";

import { useRouter } from "next/navigation";

export default function DetailLink() {
  let router = useRouter();
  return (
    <div className="flex w-1/4 ">
      <button
        onClick={() => {
          router.push("/list");
          router.refresh();
        }}
        className="w-10 p-2"
      >
        &larr;
      </button>
    </div>
  );
}
