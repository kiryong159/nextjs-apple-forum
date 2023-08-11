import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LoginBtn from "../join/LoginBtn";
import Go from "../join/go";

// 이제 안씀

export default async function Login() {
  return (
    <div className="max-w-lg mx-auto p-10 bg-blue-300 space-y-3 font-bold mb-2 flex flex-col">
      <h4 className="text-center text-2xl">로그인</h4>
      <form
        action="/api/join"
        method="POST"
        className="flex flex-col space-y-3 mb-5"
      >
        <input
          className="p-3 rounded-md"
          type="text"
          placeholder="username"
          name="username"
        />
        <input
          className="p-3 rounded-md"
          type="password"
          placeholder="password"
          name="password"
        />
        <button className="p-3 bg-gray-300 rounded-lg shadow-sm ">Login</button>
      </form>

      <div className="flex justify-center items-center relative">
        <span className="flex relative top-[26px] bg-blue-300 px-3 text-lg">
          소셜 로그인
        </span>
      </div>
      <hr />
      <div className="grid grid-cols-2 py-5 ">
        <LoginBtn />
        <LoginBtn />
      </div>
    </div>
  );
}
