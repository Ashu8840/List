"use client";
/* eslint-disable react/jsx-key */
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title and description required");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to create a topic");
      }
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        placeholder="Topic Title"
        className="border border-slate-500 px-8 py-2"
      ></input>
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        placeholder="Topic Description"
        className="border border-slate-500 px-8 py-2"
      ></input>
      <button
        type="Submit"
        className="bg-green-600  font-bold text-white py-3 px-6 w-fit"
      >
        Add Topic{" "}
      </button>
    </form>
  );
}
