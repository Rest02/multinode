import { NotesHeader } from "./NotesHeader";
import { NotesSidebar } from "./NotesSidebar";
import { NotesList } from "./NotesList";
import { NotesEditor } from "./NotesEditor";

export function NotesModal() {
    return (
        <div className="glass-container w-full max-w-[1200px] h-[800px] rounded-lg flex flex-col overflow-hidden relative">
            <NotesHeader />
            <div className="flex flex-1 overflow-hidden">
                <NotesSidebar />
                <NotesList />
                <NotesEditor />
            </div>
        </div>
    );
}
