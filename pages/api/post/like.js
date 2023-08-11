import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function Like(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return console.log("로긍니필요");
  let db = (await connectDB).db("forum");
  const findLike = await db
    .collection("like")
    .find({ authorEmail: session.user.email })
    .toArray();
  const findPost = findLike.find(
    (item) => item.hasOwnProperty("postId") && item.postId === req.body
  );

  if (findPost) {
    const delLike = await db
      .collection("like")
      .deleteMany({ authorEmail: session.user.email, postId: req.body });
    const allLike = await db
      .collection("like")
      .find({ postId: req.body })
      .toArray();
    const likeCount = allLike.length;
    const postLikeEdit = await db
      .collection("post")
      .updateOne(
        { _id: new ObjectId(req.body) },
        { $set: { likecount: likeCount } }
      );
    return res.status(200).json(likeCount);
  }
  //해당글에 좋아요를 처음누른 유저
  const addLike = await db
    .collection("like")
    .insertOne({ postId: req.body, authorEmail: session.user.email });
  const allLike = await db
    .collection("like")
    .find({ postId: req.body })
    .toArray();
  const likeCount = allLike.length;
  const postLikeEdit = await db
    .collection("post")
    .updateOne(
      { _id: new ObjectId(req.body) },
      { $set: { likecount: likeCount } }
    );

  return res.status(200).json(likeCount);
}

// 이메일 검색 - > 이글에서의 이메일인가?  postid로 확인??
// find(like에서 이메일).toarray로 authoremail 모두 찾은다음 find(postid) 를 활용해서 해보자

//db 2개 연결

//session불러와야함

// post  , like (새로만들어야함)

// 이미 좋아요가 있을시 -1  없으면 +1

// like를 array로 만들어서  .length 해주면 될듯?

/*  return console.log(
    "like req.body",
    req.body,
    "세션",
    session.user.email,
    "유저",
    findLike  ); */
