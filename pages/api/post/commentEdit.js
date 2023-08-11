import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function CommentEdits(req, res) {
  let db = (await connectDB).db("forum");
  let prevPost = await db
    .collection("comment")
    .findOne({ _id: new ObjectId(req.query) });

  let result = await db
    .collection("comment")
    .updateOne(
      { _id: new ObjectId(req.query) },
      { $set: { comment: req.body.comment } }
    );
  return res.redirect(302, `/detail/${prevPost.parent}`);
}
