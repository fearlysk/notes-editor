import { INote } from "../../interfaces/INote";
import { ISidebarProps } from "../../interfaces/ISidebarProps";

const Sidebar = ({notes, onAddNote, onDeleteNote, activeNote, setActiveNote}: ISidebarProps) => {
    
    const sortedNotes = notes.sort((a: INote, b: INote) => b.lastModified - a.lastModified)

    return (
        <div className="app-sidebar">
            <div className="app-sidebar-header">
                <h1>Notes</h1>
                <button onClick={onAddNote as never}>Add</button>
            </div>
            <div className="app-sidebar-notes">
                {sortedNotes.map((note: INote) => (
               
                <div className={`app-sidebar-note
                  ${note.id === activeNote as never ? "active" : null}`} 
                  onClick={() => setActiveNote(note.id)}
                >
                    <div className="sidebar-note-title">
                        <strong>{note.title}</strong>
                        <button onClick={() => onDeleteNote(note.id)}>Delete</button>
                    </div>
                    <p>{note.body ? note.body.substring(0, 100) + "..." : null}</p>
                    <small className="note-meta">Last modified: {new Date(note.lastModified).toLocaleDateString('en-GB', {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    })}</small>
                </div>
               ))}
            </div>
        </div>
    )
}

export default Sidebar;
