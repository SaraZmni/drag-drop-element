import { useState } from "react";
import "./App.css";
import { noteType } from "./components/note-types";
import Notes from "./components/notes";

function App() {
  const [notes, setNotes] = useState<noteType[]>([
    {
      id: 1,
      text: "Finish TypeScript project by the end of the week.",
      position: { x: 0, y: 0 },
    },
    {
      id: 2,
      text: "Review Material UI v5 documentation for responsive design tips.",
      position: { x: 0, y: 0 },
    },
  ]);

  return (
    <div>
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
