export function NotesEditor() {
    return (
        <main className="flex-1 flex flex-col bg-black/5">
            <div className="p-8 pb-4 flex items-start justify-between">
                <div className="space-y-2 flex-1">
                    <input className="w-full bg-transparent border-none focus:ring-0 text-3xl font-bold text-slate-100 p-0 placeholder:text-slate-100/20" type="text" defaultValue="Quarterly Strategy 2024" />
                    <div className="flex items-center gap-4 text-xs text-slate-100/40">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_today</span> Oct 24, 2023</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> Last edited 2:14 PM</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="size-9 flex items-center justify-center rounded-lg bg-white/5 text-slate-100/60 hover:text-slate-100 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">share</span>
                    </button>
                    <button className="size-9 flex items-center justify-center rounded-lg bg-white/5 text-slate-100/60 hover:text-slate-100 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-rose-400">delete</span>
                    </button>
                    <button className="h-9 px-4 flex items-center justify-center rounded-lg bg-primary text-background-dark font-bold text-sm hover:brightness-110 transition-all">
                        Save Changes
                    </button>
                </div>
            </div>
            <div className="flex-1 px-8 py-4 overflow-y-auto custom-scrollbar">
                <div className="max-w-3xl space-y-6 text-slate-100/80 leading-relaxed text-lg font-light">
                    <p>
                        The transition to the new multinode architecture requires a full audit of existing nodes across the primary clusters.
                        Our focus for Q1 2024 will be on <span className="text-primary font-medium">performance optimization</span> and
                        reducing overall latency in the command-line parsing engine.
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                        <h4 className="text-slate-100 font-semibold text-sm uppercase tracking-wider">Key Objectives</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                <span className="text-base">Implement 30px backdrop blur for all floating command surfaces.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                <span className="text-base">Migrate secondary UI colors to the new slate-900/100 palette.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-slate-100/20 text-lg">radio_button_unchecked</span>
                                <span className="text-base">Finalize the squircle radius at exactly 20px for a softer profile.</span>
                            </li>
                        </ul>
                    </div>
                    <p>
                        We need to ensure the amber (#f0b428) is used sparingly but effectively to guide user attention.
                        The current implementation in the sidebar hover states is a good benchmark.
                    </p>
                    <div className="aspect-video w-full rounded-lg bg-black/40 border border-white/5 flex items-center justify-center relative group overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8XQ29BIiSirC2oEr7c5PQF1kXgh-rc93ntix8BGBaEJz59p2T9IIS9M8fzSnEOH8uuxOl7d0THSbnkFyA1nsjV5RZR7XoaXH1HgStLMvO1Fm7HEBN4QRzQAc20fbTXzYrGd5lFksY53z99ewE31hmG7_2rtrHngvHEc5B8NSF08CF_Tmfer0KlgWCBhsWSmlC-_4XTUWJl8jc-kOCEUOextPfcmbCK29W2Rk3Yta4pBJ5qUng7Gc1qEvQerN5Nlx93PHu61tOUW05')" }}></div>
                        <div className="relative z-10 text-center">
                            <button className="size-12 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30 text-primary">
                                <span className="material-symbols-outlined fill-1">play_arrow</span>
                            </button>
                            <p className="text-xs mt-3 text-slate-100/60 font-medium">Architecture Overview.mp4</p>
                        </div>
                    </div>
                    <p>
                        Next steps involve a final review with the core engineering team before moving to the beta phase in late November.
                    </p>
                </div>
            </div>
            <div className="px-8 py-4 border-t border-white/5 bg-black/20 flex items-center gap-6">
                <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded hover:bg-white/10 text-slate-100/40 hover:text-slate-100 transition-colors"><span className="material-symbols-outlined text-xl">format_bold</span></button>
                    <button className="p-1.5 rounded hover:bg-white/10 text-slate-100/40 hover:text-slate-100 transition-colors"><span className="material-symbols-outlined text-xl">format_italic</span></button>
                    <button className="p-1.5 rounded hover:bg-white/10 text-slate-100/40 hover:text-slate-100 transition-colors"><span className="material-symbols-outlined text-xl">format_list_bulleted</span></button>
                    <button className="p-1.5 rounded hover:bg-white/10 text-slate-100/40 hover:text-slate-100 transition-colors"><span className="material-symbols-outlined text-xl">link</span></button>
                </div>
                <div className="h-4 w-px bg-white/10"></div>
                <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded hover:bg-white/10 text-slate-100/40 hover:text-slate-100 transition-colors"><span className="material-symbols-outlined text-xl">image</span></button>
                    <button className="p-1.5 rounded hover:bg-white/10 text-slate-100/40 hover:text-slate-100 transition-colors"><span className="material-symbols-outlined text-xl">code</span></button>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <span className="text-[10px] text-slate-100/30 uppercase tracking-widest font-bold">Auto-saved</span>
                </div>
            </div>
        </main>
    );
}
