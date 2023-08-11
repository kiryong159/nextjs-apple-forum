import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Credentials } from "aws-sdk";

const credentials = new Credentials({
  accessKeyId: process.env.AWS_S3_ID,
  secretAccessKey: process.env.AWS_S3_PW,
});

const s3client = new S3Client({
  credentials: credentials,
  region: "ap-northeast-2",
  signatureVersion: "v4",
});

export default async function DeleteHendler(req, res) {
  // 삭제할 것의 id를 받아왔음
  const id = req.query.id;
  const client = await connectDB;
  const db = client.db("forum");
  let session = await getServerSession(req, res, authOptions);
  if (session === null) {
    return res.status(500).json("로그인 정보가 없습니다.");
  }
  //삭제할 글 의 정보
  let memoAuthor = await db
    .collection("post")
    .findOne({ _id: new ObjectId(id) });
  console.log("메모", memoAuthor);
  if (session.user.email === memoAuthor.authoremail) {
    if (req.method === "DELETE") {
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(id) });
      let commentDelete = await db
        .collection("comment")
        .deleteMany({ parent: id });
      let likeDelete = await db.collection("like").deleteMany({ postId: id });
      //s3 삭제코드
      if (memoAuthor.awsUrl !== "") {
        const key = memoAuthor.awsUrl.split("/")[4];
        console.log("키", key);
        const command = new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: key,
        });
        try {
          const response = await s3client.send(command);
          console.log(response);
        } catch (err) {
          console.error("에러", err);
        }
      }
      if (result.deleteCount === 0) {
        return res.status(500).json("에러발생");
      }
      return res.status(200).json("굿");
    } else {
      return res.redirect(302, "/list");
    }
  } else {
    return res.status(500).json("글쓴이만 글을 삭제할수 있습니다.");
  }
}
