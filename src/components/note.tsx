import { forwardRef, MouseEvent } from "react";
import { positionType } from "./note-types";

interface NoteProps {
  content: string;
  initialPos: positionType;
  onMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
}

const Note = forwardRef<HTMLDivElement, NoteProps>(
  ({ content, initialPos, onMouseDown }, ref) => {
    return (
      <div
        ref={ref}
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
        onMouseDown={onMouseDown}
      >
        &#128204; {content}
      </div>
    );
  }
);

export default Note;
