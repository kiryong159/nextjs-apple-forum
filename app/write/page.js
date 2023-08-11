import { cookies } from "next/headers";
import WriteForm from "./writeForm";

export default function Write() {
  const cookie = cookies().get("isDark");
  const boolean =
    cookie === undefined ? false : cookie.value === "true" ? true : false;
  return <WriteForm isDark={boolean} />;
}
