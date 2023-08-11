import DetailLink from "@/app/list/DetailLink";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import Link from "next/link";
import Comment from "./comment";
import Like from "./like";

export default async function Detail(props) {
  const client = await connectDB;
  const db = client.db("forum");
  let session = await getServerSession(authOptions);

  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  const cookie = cookies().get("isDark");
  const isDark =
    cookie === undefined ? false : cookie.value === "true" ? true : false;
  return (
    <div
      className={`max-w-lg mx-auto rounded-md  p-10  space-y-3 font-bold mb-2 flex flex-col py-16 ${
        isDark ? "bg-gray-400" : "bg-blue-300"
      }`}
    >
      <h4 className=" text-center text-xl flex justify-between items-center mb-6 box-border">
        <DetailLink />
        <span className="w-1/2"> {result.title}</span>
        {session === null ? (
          <div className="w-1/4"></div>
        ) : session.user.email === result.authoremail ? (
          <Link
            className="flex justify-end w-1/4"
            href={`/detail/${result._id}/edit`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </Link>
        ) : (
          <div className="w-1/4"></div>
        )}
      </h4>
      {result.awsUrl ? (
        <img src={result.awsUrl} alt="img" className="rounded-md" />
      ) : null}
      <p
        className={`text-md  p-3 rounded-md ${
          isDark ? "bg-gray-500 text-gray-50" : "bg-white"
        }`}
      >
        {result.content}
      </p>
      <div
        className={`flex text-xs justify-end p-1  space-x-3 items-center ${
          isDark ? " text-gray-100" : "text-gray-500"
        }`}
      >
        <Like
          postid={props.params.id}
          likecount={result.likecount}
          session={Boolean(session)}
          isDark={isDark}
        />
        <span>작성자 : {result.author}</span>
      </div>
      <Comment
        id={props.params.id}
        email={session ? session.user.email : null}
        isDark={isDark}
      />
    </div>
  );
}
