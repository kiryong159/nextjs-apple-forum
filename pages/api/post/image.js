import aws from "aws-sdk";
export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.AWS_S3_ID,
    secretAccessKey: process.env.AWS_S3_PW,
    region: "ap-northeast-2",
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  const url = await s3.createPresignedPost({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Fields: { key: req.query.file },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
    ],
  });

  res.status(200).json(url);
}
