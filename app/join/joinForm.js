"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function JoinForm() {
  const { register, handleSubmit, formState } = useForm();
  const [error, setError] = useState("");
  const router = useRouter();
  const onValid = async (data) => {
    await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r === "ok") {
          return router.push("/api/auth/signin");
        }
        setError(r);
      });
  };
  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex flex-col space-y-3 mb-5"
    >
      <input
        {...register("username", {
          required: "Username을 적어주세요",
          validate: (value) =>
            value.includes(" ") ? "공백은 금지 입니다" : true,
        })}
        className="p-3 rounded-md"
        type="text"
        placeholder="Username"
        name="username"
      />
      {formState.errors.username ? (
        <span className="flex mx-auto justify-center bg-red-400 w-1/2 p-2 rounded-md">
          {formState.errors.username.message}
        </span>
      ) : null}
      <input
        {...register("email", {
          required: "Email을 적어주세요",
        })}
        className="p-3 rounded-md"
        type="email"
        placeholder="Email"
        name="email"
      />
      {formState.errors.email ? (
        <span className="flex mx-auto justify-center bg-red-400 w-1/2 p-2 rounded-md">
          {formState.errors.email.message}
        </span>
      ) : null}
      <input
        {...register("password", {
          required: "비밀번호를 적어주세요",
          minLength: { value: 2, message: "비밀번호는 최소 2자 입니다." },
          validate: (value) =>
            value.includes(" ") ? "공백은 금지 입니다" : true,
        })}
        className="p-3 rounded-md"
        type="password"
        placeholder="Password"
        name="password"
      />
      {formState.errors.password ? (
        <span className="flex mx-auto justify-center bg-red-400  p-2 rounded-md">
          {formState.errors.password.message}
        </span>
      ) : null}
      <button className="p-3 bg-orange-400 rounded-lg shadow-sm ">Join</button>
      {error ? (
        <span className="flex mx-auto justify-center bg-red-400  p-2 rounded-md">
          {error}
        </span>
      ) : null}
    </form>
  );
}
