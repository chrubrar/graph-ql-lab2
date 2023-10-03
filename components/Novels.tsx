"use client";

import { ADD_NOVEL } from "@/graphql/mutations";
import { GET_NOVELS } from "@/graphql/queries";
import { INovel } from "@/typings";
import { useMutation, useQuery } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import { Novel } from "./Novel";

interface Props {}

export const Novels = () => {
  const { data, loading, error } = useQuery(GET_NOVELS);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [addNovel] = useMutation(ADD_NOVEL, {
    variables: { image, title },
    refetchQueries: [{ query: GET_NOVELS }],
  });

  const novels: INovel[] = data?.novels;
  console.log(data?.novels);

  if (loading)
    return (
      <p className="text-zinc-700 flex items-center justify-center font-semibold">
        Loading.....
      </p>
    );

  if (error)
    return (
      <p className="text-zinc-700 flex items-center justify-center font-semibold">
        OOps...something went wrong
      </p>
    );
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image === "" || title === "") return alert("Enter Fields");
    addNovel({ variables: { image, title } });

    setTitle("");
    setImage("");
  };

  return (
    <div>
      <div className="mt-5 flex flex-row items-center justify-center">
        <form onSubmit={handleSubmit} className="flex my-5 space-x-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Title"
            className="bg-transparent border text-zinc-900 p-2 rounded-lg"
          />

          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            placeholder="Enter Image url"
            className="bg-transparent border text-zinc-900 p-2 rounded-lg"
          />
          <button className="bg-blue-500 p-2 rounded-lg">Add Novel</button>
        </form>
      </div>
      {
        <div className="grid grid-cols-4 gap-2">
          {novels.map((novel) => (
            <Novel key={novel.id} novel={novel} />
          ))}
        </div>
      }
    </div>
  );
};
