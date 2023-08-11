import { connectDB } from "@/util/database";

export default async function CommentData(req, res) {
  let db = (await connectDB).db("forum");
  let result = await db
    .collection("comment")
    .find({ parent: req.body })
    .toArray();
  return res.status(200).json(result);
}
