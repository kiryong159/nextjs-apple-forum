import { connectDB } from "@/util/database";

export default async function JoinHandler(req, res) {
  const client = await connectDB;
  const db = client.db("forum");
  if (req.method === "POST") {
    if (req.body.username === "" || req.body.password === "") {
      return res.status(500).json(`공백이 있으면 안됩니다.`);
    }
    const check = await db
      .collection("member")
      .findOne({ username: req.body.username });
    if (check) {
      return res.status(500).json(`이미 존재하는 username입니다.`);
    } else {
      const newUser = await db.collection("member").insertOne({
        username: req.body.username,
        password: req.body.password,
      });
      return res.redirect(302, "/");
    }
  } else {
    return;
  }
}
