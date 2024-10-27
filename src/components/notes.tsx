import {
  Dispatch,
  FC,
  MouseEvent,
  RefObject,
  SetStateAction,
  createRef,
  useEffect,
  useRef,
} from "react";

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
    const savedNotes: { id: number; position: positionType }[] =
      JSON.parse(localStorage.getItem("notes") || "[]") || []; // Example saved notes with positions


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

  const handleDragStart = (
    note: noteType,
    event: MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    const { id } = note;
    const noteRef = noteRefs.current[id];
    const startPos = note.position;

    if (noteRef && noteRef.current) {
      const rect = noteRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (noteRef.current) {
          const newX = moveEvent.clientX - offsetX;
          const newY = moveEvent.clientY - offsetY;

          noteRef.current.style.left = `${newX}px`;
          noteRef.current.style.top = `${newY}px`;
        }
      };

      const handleMouseUp = () => {
        if (noteRef.current) {
          const finalRect = noteRef.current.getBoundingClientRect();
          const newPosition = {
            x: finalRect.left + window.scrollX,
            y: finalRect.top + window.scrollY,
          };

          ////////////////// Overlap Logic ///////////////////

          if (checkForOverlap(id)) {
            noteRef.current.style.left = `${startPos.x}px`;
            noteRef.current.style.top = `${startPos.y}px`;
          } else {
            updateNotePosition(id, newPosition);
          }
        }
        document.removeEventListener(
          "mousemove",
          handleMouseMove as unknown as EventListener
        );
        document.removeEventListener("mouseup", handleMouseUp);
      };
      document.addEventListener(
        "mousemove",
        handleMouseMove as unknown as EventListener
      );
      document.addEventListener(
        "mouseup",
        handleMouseUp as unknown as EventListener
      );
    }
  };

  const checkForOverlap = (id: number) => {
    const currentNoteRef = noteRefs.current[id].current;
    if (currentNoteRef) {
      const currentRect = currentNoteRef.getBoundingClientRect();

      return notes.some((note) => {
        if (note.id === id) return false;

        const otherNoteRef = noteRefs.current[note.id].current;
        if (otherNoteRef) {
          const otherRect = otherNoteRef.getBoundingClientRect();
          const overlap = !(
            currentRect.right < otherRect.left ||
            currentRect.left > otherRect.right ||
            currentRect.bottom < otherRect.top ||
            currentRect.top > otherRect.bottom
          );

          return overlap;
        }
      });
    }
  };

  const updateNotePosition = (id: number, newPosition: positionType) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, position: newPosition } : note
    );

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };


  return (
    <div>
      {notes.map((note) => (
        <Note
          key={note.id}
          content={note.text}
          initialPos={note.position}
          onMouseDown={(event) => handleDragStart(note, event)}
          ref={
            noteRefs.current[note.id]
              ? noteRefs.current[note.id]
              : (noteRefs.current[note.id] = createRef<HTMLDivElement>())
          }
        />

      ))}
    </div>
  );
};

export default Notes;
