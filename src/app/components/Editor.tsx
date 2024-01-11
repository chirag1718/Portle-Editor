"use client";
import React, { FC, useState } from "react";
import {
  ContentState,
  Editor,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import Decorator from "./Decorator";
import "draft-js/dist/Draft.css";

// types for Editor Props
export interface EditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
const CustomEditor: FC<EditorProps> = ({ initialValue, onChange, style }) => {
  const [editorState, setEditorState] = useState(() => {
    // if saved 💾 content is ✅ available than render that from local storage 🫙
    const storedContent = localStorage.getItem("editorContent");
    if (storedContent) {
      const rawContent = JSON.parse(storedContent);
      return EditorState.createWithContent(
        convertFromRaw(rawContent),
        Decorator
      );
    } else {
      // if saved 💾 content is ❌ not available than render fresh editor
      return initialValue
        ? EditorState.createWithContent(
            ContentState.createFromText(initialValue),
            Decorator
          )
        : EditorState.createEmpty(Decorator);
    }
  });
  // this function here handles the change in editor
  const handleChange = (newEditorState: EditorState): void => {
    setEditorState(newEditorState);
    if (onChange) {
      onChange(
        newEditorState
          .getCurrentContent()
          .getBlocksAsArray()
          .map((block) => block.getText())
          .join("\n")
      );
    }
  };
  // this function saves 💾 in local storage 🫙
  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    localStorage.setItem("editorContent", JSON.stringify(rawContent));
  };

  return (
    <div style={style} className="bg-stone-800 p-5 mr-5 text-stone-300">
      {/* SAVE BUTTON */}
      <div className="absolute top-8 right-10 ">
        <button
          className="flex items-center justify-center h-10 w-20 border-2 rounded-md active:scale-[0.98] transition-all duration-150 ease-in"
          onClick={handleSave}
        >
          <span>Save</span>
        </button>
      </div>
      {/* EDITOR */}
      <Editor
        editorState={editorState}
        onChange={handleChange}
        placeholder="Start Typing...."
      />
    </div>
  );
};

export default CustomEditor;
