import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function newComment(req, res) {
  let session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(500).json("로그인 유저만 작성 가능합니다.");
  req.body = JSON.parse(req.body);
  const db = (await connectDB).db("forum");
  if (req.body.comment === "" || req.body.comment === undefined) {
    return res.status(500).json("댓글을 작성해주세요.");
  }
  if (req.method === "POST") {
    let result = await db.collection("comment").insertOne({
      comment: req.body.comment,
      parent: req.body.id,
      authoremail: session.user.email,
      author: session.user.username,
    });
    let newComment = await db
      .collection("comment")
      .find({ parent: req.body.id })
      .toArray();
    return res.status(200).json(newComment);
  }
  return res.status(500).json("올바르지않은 요청입니다.");
}

/*
 */
