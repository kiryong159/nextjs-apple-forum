import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function JoinHandler(req, res) {
  const client = await connectDB;
  const db = client.db("forum");

  if (req.method === "POST") {
    if (
      req.body.username === "" ||
      req.body.password === "" ||
      req.body.email === ""
    ) {
      return res.status(500).json("공백은 금지 되어 있습니다.");
    }

    let emailcheck = await db
      .collection("member")
      .findOne({ email: req.body.email });
    if (emailcheck) {
      return res.status(500).json("이미 가입된 이메일 입니다.");
    }

    let hashpassword = await bcrypt.hash(req.body.password, 3);
    let result = await db.collection("member").insertOne({
      username: req.body.username,
      email: req.body.email,
      password: hashpassword,
    });
    return res.redirect(302, "/");
  }
  return res.status(500).json("req.method !== post");
}

//이메일중복첵
