import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { noteType, positionType } from "./note-types";
import Note from "./note";

interface NotesProps {
  notes: noteType[];
  setNotes: Dispatch<SetStateAction<noteType[]>>;
}

const Notes: FC<NotesProps> = ({ notes = [], setNotes }) => {
  useEffect(() => {
    const savedNotes: { id: number; position: positionType }[] = []; // Example saved notes with positions

    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((sn) => sn.id === note.id); // Check if note is saved

      if (savedNote) {
        return { ...note, position: savedNote.position }; // Return note with saved position
      } else {
        const position = determinedNewPosition(); // Determine new position if not saved
        return { ...note, position }; // Return note with new position
      }
    });
    setNotes(updatedNotes); // Update the state with the new notes array
    localStorage.setItem("notes", JSON.stringify(notes)); // Making Notes Persistant
  }, [notes.length]);

  const determinedNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;

    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  return (
    <div>
      {notes.map((note) => (
        <Note key={note.id} content={note.text} initialPos={note.position} />
      ))}
    </div>
  );
};

export default Notes;
