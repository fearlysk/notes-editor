import { INote } from './INote';

export interface ISidebarProps {
    notes: INote[],
    onAddNote(note?: string | boolean): void,
    onDeleteNote(note?: string | boolean): void,
    activeNote: INote[],
    setActiveNote(note?: string | boolean): void
}
