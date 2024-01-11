"use client";
import React from "react";
import dynamic from "next/dynamic";
import type { EditorProps } from "./components/Editor";
const Editor = dynamic(() => import("@/app/components/Editor"), { ssr: false });

const page = (props: EditorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 h-full w-full p-5">
      {/* header */}
      <div className="flex items-center justify-center h-14 min-h-14 w-full relative">
        {/*  TITLE */}
        <p>Demo Editor by Chirag</p>
      </div>
      {/* EDITOR */}
      <div className="h-full w-full border-2 rounded overflow-hidden p-5">
        <div className="h-full w-full overflow-auto">
          <Editor {...props} />
        </div>
      </div>
    </div>
  );
};

export default page;
