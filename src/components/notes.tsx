import { Dispatch, FC, RefObject, SetStateAction, createRef, useEffect, useRef } from "react";
import { noteType, positionType } from "./note-types";
import Note from "./note";

interface NotesProps {
  notes: noteType[];
  setNotes: Dispatch<SetStateAction<noteType[]>>;
}

// Define the type for a single note ref
type NoteRef = RefObject<HTMLDivElement>;

// Define the type for the noteRefs object
interface NoteRefs {
  [id: number]: NoteRef;
}

const Notes: FC<NotesProps> = ({ notes = [], setNotes }) => {
  useEffect(() => {
    const savedNotes: { id: number; position: positionType }[] = JSON.parse(localStorage.getItem('notes') ||'[]') || []; // Example saved notes with positions

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

  const noteRefs = useRef<NoteRefs>([]);

  const determinedNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;

    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  const handeDragStart = (id:number, event:MouseEvent) => {
    const noteRef = noteRefs.current[id];
    if (noteRef && noteRef.current) {
      const rect = noteRef.current.getBoundingClientRect()
      console.log('rect',rect)
    }
  }

  return (
    <div>
      {notes.map((note) => (
        <Note key={note.id} content={note.text} initialPos={note.position} onMouseDown={(event) => handeDragStart(note.id,event)} ref={noteRefs.current[note.id] ? noteRefs.current[note.id] :(noteRefs.current[note.id] = createRef<HTMLDivElement>())}/>
      ))}
    </div>
  );
};

export default Notes;
