import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function CommentDel(req, res) {
  req.body = JSON.parse(req.body);
  let db = (await connectDB).db("forum");
  let result = await db
    .collection("comment")
    .deleteOne({ _id: new ObjectId(req.body.commentid) });
  let newComment = await db
    .collection("comment")
    .find({ parent: req.body.id })
    .toArray();

  return res.status(200).json(newComment);
}
