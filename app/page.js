import { connectDB } from "@/util/database";
import { cookies } from "next/headers";

export default async function Home() {
  const cookie = cookies().get("isDark");
  const isDark =
    cookie === undefined ? false : cookie.value === "true" ? true : false;
  return (
    <div
      className={`max-w-lg mx-auto p-10 rounded-md font-bold mb-2 flex flex-col ${
        isDark ? "bg-gray-400" : "bg-blue-300"
      }`}
    >
      <div className="space-y-3">
        <img
          className="rounded-md h-auto"
          src="https://appleboardimg6779.s3.ap-northeast-2.amazonaws.com/next.png"
        />
        <h1 className="text-center text-3xl"> NEXT.JS로 게시판 만들기 </h1>
        <div className="space-y-3">
          <details className="flex flex-col space-y-3">
            <summary>사용한것들</summary>
            <span>Next.js</span>
            <span>mongoDB</span>
            <span>AWS S3</span>
            <span>Tailwind Css</span>
          </details>
        </div>
      </div>
    </div>
  );
}
