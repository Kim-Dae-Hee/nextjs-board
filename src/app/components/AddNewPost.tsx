"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UploadIcon from "./icons/UploadIcon";
import LoadingSpinner from "./spinner/LoadingSpinner";
import Button from "./Button";

export default function AddNewPost() {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newImageFile, setImageFile] = useState<File>();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [error, setError] = useState<string>();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault(); // 파일을 드래그 완료했을 때, 브라우저가 자동으로 올린 파일을 여는 것을 막음
    const files = e.target?.files; // 드래그된 파일 목록을 가져옴
    if (files && files[0]) {
      setImageFile(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // 파일을 드래그 했을 때, 브라우저가 자동으로 올린 파일을 여는 것을 막음
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); // 파일을 드래그 완료했을 때, 브라우저가 자동으로 올린 파일을 여는 것을 막음
    setDragging(false);
    const files = e.dataTransfer?.files; // 드래그된 파일 목록을 가져옴
    if (files && files[0]) {
      setImageFile(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newImageFile) return;

    setLoading(true);
    //웹 페이지에서 파일 업로드 또는 HTTP POST 요청을 생성할 때 사용
    const formData = new FormData();
    formData.append("title", titleRef.current?.value ?? "");
    formData.append("file", newImageFile);
    formData.append("content", contentRef.current?.value ?? "");

    fetch("/api/posts", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} : ${res.statusText}`);
          return;
        }
        router.push("/");
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className="flex flex-col m-auto items-center max-w-xl mt-10 mb-4">
      {loading && (
        <div className="absolute inset-0 z-20 text-center pt-[30%] bg-gray-500/40">
          <LoadingSpinner />
        </div>
      )}
      {error && (
        <p className="w-full bg-red-100 text-red-600 text-center font-bold p-4 mb-4 ">
          {error}
        </p>
      )}
      
      <h1 className="font-bold text-2xl md:text-4xl text-gray-500 mb-2">새로운 board 등록</h1>
      <form className="flex flex-col w-full mt-4" onSubmit={handleSubmit}>
        <input
          className="px-2 h-20 font-bold rounded-t-lg outline-none text-2xl bg-transparent border border-neutral-300"
          id="title"
          type="text"
          placeholder="제목을 입력해주세요~"
          required
          ref={titleRef}
        />
        <input
          className="hidden"
          id="upload"
          name="input"
          type="file"
          accept="image/*"
          onChange={handleChange} // 사용자가 파일 선택 대화 상자에서 파일을 선택하고 확인 버튼을 누르면 발생
        />
        <label
          className="w-full h-60 flex flex-col border border-neutral-300 items-center justify-center"
          htmlFor="upload"
          onDragEnter={handleDrag} // 드래그한 항목이 요소 위로 들어갈 때 발생
          onDragLeave={handleDrag} // 드래그한 항목이 요소를 떠날 때 발생
          onDragOver={handleDragOver} // 드래그한 항목이 요소 위에 있을 때 지속적으로 발생
          onDrop={handleDrop} // 드래그한 항목을 요소 위에 놓을 때 발생
        >
          {/* pointer-events-none - 마우스 이벤트 비활성화 */}
          {dragging && (
            <div className="absolute inset-0 z-10 pointer-events-none" />
          )}
          {!newImageFile && (
            <div className="flex flex-col items-center pointer-events-none">
              <UploadIcon />
              <p>파일을 업로드해주세요~</p>
            </div>
          )}
          {newImageFile && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(newImageFile)}
                alt="local file"
                fill
              />
            </div>
          )}
        </label>
        <textarea
          className="px-2 py-1 outline-none text-lg border border-neutral-300"
          id="content"
          name="text"
          rows={8}
          required
          placeholder={`내용을 입력해주세요~`}
          ref={contentRef}
        />
        <Button text="저장하기" onClick={() => {}} />
      </form>
    </section>
  );
}
