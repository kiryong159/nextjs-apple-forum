import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);
  console.log("req.body", req.body);
  const client = await connectDB;
  const db = client.db("forum");
  let session = await getServerSession(req, res, authOptions);
  if (session) {
    if (req.method === "POST") {
      if (req.body.title === "" || req.body.content === "") {
        return res.status(500).json("제목과 내용을 쓰세요");
      }
      let result = await db.collection("post").insertOne({
        title: req.body.title,
        content: req.body.content,
        author: session.user.username,
        authoremail: session.user.email,
        awsUrl: req.body.awsUrl,
        likecount: 0,
      });

      return res.status(200).json(result);
    }
  } else {
    return res.status(500).json("로그인 을 해주세요");
  }

  if (req.method === "GET") {
    let result = await db.collection("post").find().toArray();
    return res.status(200).json(result);
  }
}
