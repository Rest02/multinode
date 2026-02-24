export function NotesSidebar() {
    return (
        <nav className="w-20 lg:w-64 border-r border-white/10 flex flex-col justify-between p-4 shrink-0 bg-black/10">
            <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 px-3 py-2.5 text-primary bg-primary/10 rounded-lg transition-colors group">
                    <span className="material-symbols-outlined fill-1">description</span>
                    <span className="text-sm font-medium hidden lg:block">All Notes</span>
                </button>
                <button className="flex items-center gap-3 px-3 py-2.5 text-slate-100/60 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="material-symbols-outlined">add_circle</span>
                    <span className="text-sm font-medium hidden lg:block">New Note</span>
                </button>
                <button className="flex items-center gap-3 px-3 py-2.5 text-slate-100/60 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="material-symbols-outlined">folder</span>
                    <span className="text-sm font-medium hidden lg:block">Notebooks</span>
                </button>
                <button className="flex items-center gap-3 px-3 py-2.5 text-slate-100/60 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="material-symbols-outlined">sell</span>
                    <span className="text-sm font-medium hidden lg:block">Tags</span>
                </button>
                <button className="flex items-center gap-3 px-3 py-2.5 text-slate-100/60 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="material-symbols-outlined">star</span>
                    <span className="text-sm font-medium hidden lg:block">Favorites</span>
                </button>
            </div>
            <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 px-3 py-2.5 text-slate-100/60 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="material-symbols-outlined">settings</span>
                    <span className="text-sm font-medium hidden lg:block">Settings</span>
                </button>
                <div className="flex items-center gap-3 px-3 py-2.5 mt-2 border-t border-white/5">
                    <div className="size-8 rounded-full bg-primary flex items-center justify-center text-background-dark font-bold text-xs" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUJnFW6x4_0icg4rcorOcbAP30WGcps8-9Iujar4tgUdLt_gkgQLZyRaMckM-J4K4LwbO3gl5aFKJYmv9VuuFAd0ixVxQmd0fx64QjegURX_tM15pwg4jvW2st64oGy3G1KdI24KCQdJIQcISJFCOKL8hXN21tJF9JQtxfzqqJqLDcJnCg-xqi5hnyLo-Wn1c2kQhdl6-y3LxhJJ-2NwsG2A8UqfI14FVJxbBdFKEjGxo9rGk-9fxR3oj5IZ841ML_bWng7JCWqTwx')", backgroundSize: "cover" }}>
                        JS
                    </div>
                    <div className="hidden lg:block overflow-hidden">
                        <p className="text-xs font-semibold text-slate-100 truncate">Julian Sterling</p>
                        <p className="text-[10px] text-slate-100/40 truncate">Pro Account</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}
