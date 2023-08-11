"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WriteForm({ isDark }) {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [preImg, setPreImg] = useState("");
  const [filename, setFilename] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imgResult2, setImgResult2] = useState();
  const titleC = (e) => {
    setTitle(e.target.value);
  };
  const textC = (e) => {
    setText(e.target.value);
  };

  const ImgChange = async (e) => {
    let selectfile = e.target.files[0];
    // 파일이 선택되면 파일,파일.이름 을 state에 저장시켜줌
    setFile(selectfile);
    const uniqueFilename = Date.now() + "_" + selectfile.name;
    setFilename(uniqueFilename);

    const preSrc = URL.createObjectURL(selectfile);
    setPreImg(preSrc);
    //한글로 업로드하면 깨질수있기때문에 인코딩 시키는 작업
    const fileName2 = encodeURIComponent(uniqueFilename);

    //프리사인 업로드
    const imgresult = await fetch(`/api/post/image?file=${fileName2}`)
      .then((r) => r.json())
      .then((r) => {
        //프리사인한 결과물 저장
        setImgResult2(r);
      });
  };
  const onClick = async (e) => {
    e.preventDefault();
    if (preImg) {
      // s3업로드
      const formData = new FormData();
      Object.entries({ ...imgResult2.fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const upload = await fetch(imgResult2.url, {
        method: "POST",
        body: formData,
      });

      console.log("업로드", upload);
      const postUpload = await fetch(`/api/post/new`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          content: text,
          awsUrl: upload.url + "/" + filename,
        }),
      }).then(() => {
        router.push("/list");
        router.refresh();
      });
    } else {
      const postUpload = await fetch(`/api/post/new`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          content: text,
          awsUrl: "",
        }),
      }).then(() => {
        router.push("/list");
        router.refresh();
      });
    }
  };

  return (
    <div
      className={`max-w-lg mx-auto p-10 space-y-3 font-bold mb-2 flex flex-col ${
        isDark ? "bg-gray-400" : "bg-blue-300 "
      }`}
    >
      <h4 className="text-center text-2xl">글작성</h4>
      <form className="flex flex-col space-y-3 ">
        <input
          type="text"
          name="title"
          onChange={titleC}
          value={title}
          placeholder="글제목"
          className="p-3 rounded-md"
        />
        <textarea
          name="content"
          value={text}
          onChange={textC}
          placeholder="write ..."
          className="p-3 rounded-md w-full h-24 resize-none"
        />
        <label
          id="image"
          className="bg-white p-3 rounded-md flex justify-center items-center w-full h-28 border-2  border-gray-500 border-dashed hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <input
            onChange={ImgChange}
            name="image"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
        <img src={preImg} className="rounded-md" />
        <button
          className="p-5 bg-orange-400 rounded-lg shadow-sm "
          onClick={onClick}
        >
          submit
        </button>
      </form>
    </div>
  );
}
