import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function EditHandler(req, res) {
  const client = await connectDB;
  const db = client.db("forum");
  let session = await getServerSession(req, res, authOptions);
  let emailcheck = await db
    .collection("post")
    .findOne({ _id: new ObjectId(req.query) });

  if (req.method === "POST") {
    if (session.user.email === emailcheck.authoremail) {
      if (req.body.title === "" || req.body.content === "") {
        return res.status(500).json("글제목과 내용을 채워주세요");
      }
      let result = await db
        .collection("post")
        .updateOne(
          { _id: new ObjectId(req.query) },
          { $set: { title: req.body.title, content: req.body.content } }
        );
      return res.redirect(302, "/list");
    } else {
      return res.status(500).json("작성자만 글을 수정 할수 있습니다.");
    }
  } else {
    return;
  }
}

// 아이디 받아오기
