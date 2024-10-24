import { FC, Ref } from "react";
import { positionType } from "./note-types";

interface NoteProps {
  content: string;
  initialPos: positionType;
  ref: Ref<HTMLDivElement>;
  onMouseDown:(event:MouseEvent) => void
}

const Note: FC<NoteProps> = (props) => {
  const { content, initialPos } = props;
  return (
    <div
      style={{
        position: "absolute",
        left: `${initialPos.x}px`,
        top: `${initialPos.y}px`,
        border: "1px solid black",
        userSelect: "none",
        padding: "10px",
        width: "200px",
        cursor: "move",
        backgroundColor: "lightyellow",
      }}
    >
      &#128204; {content}
    </div>
  );
};

export default Note;
