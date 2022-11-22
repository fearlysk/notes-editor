import { useEffect, useState } from "react";
import uuid from "react-uuid"
import './App.scss';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import { INote } from "./interfaces/INote";

function App() {

  const [notes, setNotes] = useState<INote[]>(
    localStorage.notes ? JSON.parse(localStorage.notes): []
  );
 
  const [activeNote, setActiveNote] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes])

  const onAddNote = () => {
    const newNote: INote = {
      id: uuid(),
      title: "Note",
      body: "",
      lastModified: Date.now(),
    }
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id as never);
  }

  const onUpdateNote = (updatedNote: INote) => {
    const updatedNotes = notes.map((note) => {
      if(note.id === activeNote) {
        return updatedNote;
      }
      return note;
    })
    setNotes(updatedNotes)
  }

  const onDeleteNote = (idToDelete: string) => {
    setNotes(notes.filter((note) => note.id !== idToDelete  ))
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  return ( 
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote as never}
        setActiveNote={setActiveNote as never}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote as never}/>
    </div>
  );
}

export default App;
