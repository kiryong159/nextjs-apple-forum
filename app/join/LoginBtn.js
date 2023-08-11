"use client";
import { signIn } from "next-auth/react";

export default function LoginBtn({ layoutCookie }) {
  return (
    <button
      onClick={() => signIn()}
      className={`${layoutCookie ? "text-white" : "text-black"}`}
    >
      Login
    </button>
  );
}
