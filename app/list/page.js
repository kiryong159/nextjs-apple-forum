import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import ListMap from "./listmap";

export const dynamic = "force-dynamic";

export default async function List() {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  result = result.map((a) => {
    a._id = a._id.toString();
    return a;
  });
  const cookie = cookies().get("isDark");
  const boolean =
    cookie === undefined ? false : cookie.value === "true" ? true : false;

  return <ListMap result={result} isDark={boolean} />;
}
