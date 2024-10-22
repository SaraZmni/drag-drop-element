import { useState } from "react";
import "./App.css";
import { noteType } from "./components/note-types";
import Notes from "./components/notes";

function App() {
  const [notes, setNotes] = useState<noteType[]>([
    {
      id: 1,
      text: "Check the description for my Frontend Interview Prep Course",
    },
    {
      id: 2,
      text: "Like this Video and Subscribe to Roadside Coder",
    },
  ]);

  return (
    <div>
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
