export function NotesHeader() {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-6">
                <div className="flex gap-2">
                    <button className="size-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"></button>
                    <button className="size-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all"></button>
                    <button className="size-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all"></button>
                </div>
            </div>
            <div className="flex-1 mx-8">
                <div className="relative group w-full">
                    <input className="w-full bg-white/5 border border-white/10 rounded-lg py-1.5 px-4 font-mono text-sm text-slate-100 placeholder:text-slate-100/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" placeholder="Enter command..." type="text" defaultValue="Search /notes..." />
                </div>
            </div>
            <div className="flex items-center gap-4">
            </div>
        </header>
    );
}
