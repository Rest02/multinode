export function NotesList() {
    return (
        <div className="w-80 border-r border-white/10 flex flex-col shrink-0">
            <div className="p-6 border-b border-white/10">
                <h2 className="text-slate-100 text-lg font-semibold">Recent Notes</h2>
                <p className="text-slate-100/40 text-xs mt-1">12 notes updated this week</p>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
                <div className="p-4 rounded-lg note-card-active cursor-pointer transition-all">
                    <h3 className="text-slate-100 text-sm font-semibold mb-1">Quarterly Strategy 2024</h3>
                    <p className="text-slate-100/50 text-xs line-clamp-2 leading-relaxed">The transition to the new multinode architecture requires a full audit of existing nodes...</p>
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-[10px] text-primary/80 font-medium">Updated 2h ago</span>
                        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-100/40">Strategy</span>
                    </div>
                </div>
                <div className="p-4 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-all group">
                    <h3 className="text-slate-100/80 group-hover:text-slate-100 text-sm font-semibold mb-1">Product Roadmap Phase 2</h3>
                    <p className="text-slate-100/40 text-xs line-clamp-2 leading-relaxed">Focus on high-fidelity UI components and amber accent integration across the dashboard...</p>
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-[10px] text-slate-100/30 font-medium">Updated 5h ago</span>
                        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-100/40">Draft</span>
                    </div>
                </div>
                <div className="p-4 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-all group">
                    <h3 className="text-slate-100/80 group-hover:text-slate-100 text-sm font-semibold mb-1">Team Sync: Design Systems</h3>
                    <p className="text-slate-100/40 text-xs line-clamp-2 leading-relaxed">Consistency is key for the 2.0 launch. Use the primary #f0b428 for all active states...</p>
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-[10px] text-slate-100/30 font-medium">Updated 1d ago</span>
                        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-100/40">Meetings</span>
                    </div>
                </div>
                <div className="p-4 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-all group">
                    <h3 className="text-slate-100/80 group-hover:text-slate-100 text-sm font-semibold mb-1">User Interview Insights</h3>
                    <p className="text-slate-100/40 text-xs line-clamp-2 leading-relaxed">"The glassmorphism feels premium," says Participant A. Need to optimize blur performance...</p>
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-[10px] text-slate-100/30 font-medium">Updated 3d ago</span>
                        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-100/40">Research</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
