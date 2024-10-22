import { Dispatch, FC, SetStateAction } from "react";
import { noteType } from "./note-types";
import Note from "./note";

interface NotesProps {
  notes: noteType[];
  setNotes: Dispatch<SetStateAction<noteType[]>>;
}

const Notes: FC<NotesProps> = ({ notes = [], setNotes }) => {
  return (
    <div>
      {notes.map((note) => (
        <Note key={note.id} content={note.text} />
      ))}
    </div>
  );
};

export default Notes;
