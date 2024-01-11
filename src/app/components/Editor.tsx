"use client";
import { ContentState, Editor, EditorState } from "draft-js";
import React, { FC, useRef, useState } from "react";
import Decorator from "./Decorator";
import "draft-js/dist/Draft.css";
export interface EditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
  spellCheck?: boolean;
}
const CustomEditor: FC<EditorProps> = ({ initialValue, onChange, style }) => {
  const [editorState, setEditorState] = useState(() =>
    initialValue
      ? EditorState.createWithContent(
          ContentState.createFromText(initialValue),
          Decorator
        )
      : EditorState.createEmpty(Decorator)
  );
  const editorRef = useRef<EditorState | null>(null);
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
  return (
    <div style={style}>
      <Editor
        editorState={editorState}
        onChange={handleChange}
        placeholder="Start writing..."
      />
    </div>
  );
};

export default CustomEditor;
