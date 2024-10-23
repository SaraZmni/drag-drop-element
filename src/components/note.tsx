import { FC } from "react";

const Note: FC<{ content: string }> = ({ content }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
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
