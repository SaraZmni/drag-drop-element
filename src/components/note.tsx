import { FC } from "react";

const Note: FC<{ content: string }> = ({ content }) => {
  return <div>{content}</div>;
};

export default Note;
