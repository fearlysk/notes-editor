import { useState } from "react";
import { INote } from "../../interfaces/INote";
import { ISidebarProps } from "../../interfaces/ISidebarProps";

const Sidebar = ({notes, onAddNote, onDeleteNote, activeNote, setActiveNote}: ISidebarProps) => {
    
    const [filterValue, setFilterValue] = useState<string>("");
    
    const sortedNotes = notes.sort((a: INote, b: INote) => b.lastModified - a.lastModified);
    const tempSortedNotes = notes.sort((a: INote, b: INote) => b.lastModified - a.lastModified);
    
    const filteredNotes = filterValue ? tempSortedNotes.filter(note => {
        return note.tag.toLowerCase().includes(filterValue.toLowerCase());
    }) : sortedNotes;

    return (
        <div className="app-sidebar">
            <div className="app-sidebar-header">
                <h1>Notes</h1>
                    <div>
                        <input 
                          type="text"
                          className="app-tag-filter"
                          placeholder="Filter by tag..."
                          value={filterValue}
                          onChange={(e) => setFilterValue(e.target.value)}
                          />
                    </div>
                <button onClick={onAddNote as never}>Add note</button>
            </div>
            <div className="app-sidebar-notes">
                {filteredNotes.length ? filteredNotes.map((note: INote) => (
               
                    <div className={`app-sidebar-note
                      ${note.id === activeNote as never ? "active" : null}`} 
                      onClick={() => setActiveNote(note.id)}
                    >
                    <div className="sidebar-note-title">
                        <p>{note.title}</p>
                    </div>
                    <button onClick={() => onDeleteNote(note.id)}>Delete</button>
                    <p>{note.tag ? "Tag: " + note.tag : null}</p>
                    <p>{note.body ? note.body.substring(0, 100) + "..." : null}</p>
                    <small className="note-meta">Last modified: {new Date(note.lastModified).toLocaleDateString('en-GB', {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    })}</small>
                </div>
               )) : <p className="no-notes">No notes!</p>}
            </div>
        </div>
    )
}

export default Sidebar;
