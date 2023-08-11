import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Go from "./go";

export default async function Join() {
  let session = await getServerSession(authOptions);
  if (session) {
    return <Go />;
  }

  return (
    <div className="max-w-lg mx-auto p-10 bg-blue-300 space-y-3 font-bold mb-2 flex flex-col">
      <h4 className="text-center text-2xl">회원가입</h4>
      <form
        action="/api/auth/signup"
        method="POST"
        className="flex flex-col space-y-3 mb-5"
      >
        <input
          className="p-3 rounded-md"
          type="text"
          placeholder="Username"
          name="username"
        />
        <input
          className="p-3 rounded-md"
          type="email"
          placeholder="Email"
          name="email"
        />
        <input
          className="p-3 rounded-md"
          type="password"
          placeholder="Password"
          name="password"
        />
        <button className="p-3 bg-orange-400 rounded-lg shadow-sm ">
          Join
        </button>
      </form>
    </div>
  );
}
