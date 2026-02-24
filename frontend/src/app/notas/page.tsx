"use client";

import { NotesModal } from "../../components/Notes/NotesModal";
import { MenuBar } from "../../components/MenuBar/MenuBar";

import styles from "../page.module.css";

export default function NotasPage() {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            <style jsx global>{`
                .glass-container {
                    backdrop-filter: blur(30px);
                    background-color: rgba(28, 28, 30, 0.75);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
                }
                .cursor-pulse {
                    animation: pulse 1s infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .note-card-active {
                    background-color: rgba(240, 180, 40, 0.1);
                    border: 1px solid rgba(240, 180, 40, 0.3);
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            `}</style>

            <div className={styles.root}>
                {/* ── Top Navigation ── */}
                <MenuBar />

                {/* ── Main Canvas (Notes App) ── */}
                <main className={styles.canvas}>
                    <div className="dark flex-1 flex w-full h-full items-center justify-center font-display">
                        <NotesModal />
                    </div>
                </main>

            </div>
        </>
    );
}
