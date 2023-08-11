"use client";
import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <button className="text-red-300" onClick={() => signOut()}>
      Logout
    </button>
  );
}
