import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

export default async function CommentEdit(props) {
  let db = (await connectDB).db("forum");
  let result = await db
    .collection("comment")
    .findOne({ _id: new ObjectId(props.params.id) });

  const cookie = cookies().get("isDark");
  const isDark =
    cookie === undefined ? false : cookie.value === "true" ? true : false;
  return (
    <div
      className={`max-w-lg mx-auto p-10  space-y-3 font-bold mb-2 flex flex-col ${
        isDark ? "bg-gray-400" : "bg-blue-300"
      }`}
    >
      <h4 className="text-center text-2xl">댓글 수정</h4>
      <form
        className="flex flex-col space-y-3"
        action={`/api/post/commentEdit?id=${result._id}`}
        method="POST"
      >
        <input
          type="text"
          name="comment"
          placeholder="댓글"
          className={`p-3 rounded-md ${isDark ? "bg-gray-500 text-white" : ""}`}
          defaultValue={result.comment}
        />

        <button
          className="p-2 bg-orange-400 rounded-lg shadow-sm "
          tpye="submit"
        >
          Edit
        </button>
      </form>
    </div>
  );
}
