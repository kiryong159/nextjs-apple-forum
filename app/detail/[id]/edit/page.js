import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

export default async function DetailEdit(props) {
  const client = await connectDB;
  const db = client.db("forum");
  let id = props.params.id;
  let result = await db.collection("post").findOne({ _id: new ObjectId(id) });

  const cookie = cookies().get("isDark");
  const isDark =
    cookie === undefined ? false : cookie.value === "true" ? true : false;
  return (
    <div
      className={`max-w-lg mx-auto p-10 space-y-3 font-bold mb-2 flex flex-col ${
        isDark ? "bg-gray-400" : "bg-blue-300 "
      }`}
    >
      <h4 className="text-center text-2xl">글 수정</h4>
      <form
        className="flex flex-col space-y-3"
        action={`/api/post/edit/${id}`}
        method="POST"
      >
        <input
          type="text"
          name="title"
          placeholder="글제목"
          className={`p-3 rounded-md ${isDark ? "bg-gray-200" : ""}`}
          defaultValue={result.title}
        />
        <textarea
          name="content"
          placeholder="write ..."
          className={`p-3 rounded-md w-full h-24 resize-none ${
            isDark ? "bg-gray-200" : ""
          }`}
          defaultValue={result.content}
        />
        <button
          className="p-3 bg-orange-400 rounded-lg shadow-sm "
          tpye="submit"
        >
          Edit
        </button>
      </form>
    </div>
  );
}
