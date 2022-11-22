import { INote } from "./INote";

export interface IMainProps {
    activeNote: INote | undefined,
    onUpdateNote({}): void
}
