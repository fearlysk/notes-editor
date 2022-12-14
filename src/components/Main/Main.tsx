import ReactMarkdown from "react-markdown";
import { IMainProps } from "../../interfaces/IMainProps";

const Main = ({activeNote, onUpdateNote}: IMainProps) => {

    const onEditField = (field: string, value: string) => {
        onUpdateNote({
            ...activeNote,
            [field]: value,
            lastModified: Date.now()
        })
    }

    if(!activeNote) return <div className="no-active-note">No note selected</div>

    return (
        <div className="app-main">
            <div className="app-main-note-edit">
                <input 
                  type="text" 
                  id="title" 
                  value={activeNote.title} 
                  onChange={(e) => onEditField("title", e.target.value)}
                  autoFocus 
                />
                 <input 
                  type="text" 
                  id="tag" 
                  value={activeNote.tag} 
                  onChange={(e) => onEditField("tag", e.target.value)}
                  placeholder="Add tag..."
                />
                <textarea 
                  id="body"
                  placeholder="Add note..." 
                  value={activeNote.body}
                  onChange={(e) => onEditField("body", e.target.value)}
                 />
            </div>
            <div className="app-main-note-preview">
                <h1 className="preview-title">{activeNote.title}</h1>
                <h5 className="preview-title">{activeNote.tag ? "Tag: " + activeNote.tag : null}</h5>
                <ReactMarkdown className="markdown-preview">{activeNote.body}</ReactMarkdown>
            </div>
        </div>
    )
}

export default Main;
