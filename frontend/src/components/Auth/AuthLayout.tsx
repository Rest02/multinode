import React, { ReactNode } from "react";
import { MenuBar } from "../MenuBar/MenuBar";

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-slate-900 dark:text-slate-100 antialiased overflow-hidden">
            <MenuBar />

            <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
                {/* Abstract Background Detail */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
                </div>

                {/* Main Panel */}
                <div className="w-full max-w-[420px] bg-background-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/10 [box-shadow:0_25px_50px_-12px_rgba(0,0,0,0.7)] p-8 z-10">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1 w-8 bg-primary"></div>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">System Auth</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-crisp-white font-mono uppercase">
                            {title}
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-muted-gray mt-1">
                            {subtitle}
                        </p>
                    </div>

                    {children}
                </div>

                {/* Footer System Info */}
                <footer className="mt-12 text-center space-y-2">
                    <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-slate-400 dark:text-muted-gray/60 uppercase tracking-[0.3em]">
                        <span>Node: US-EAST-01</span>
                        <span className="w-1 h-1 bg-slate-300 dark:bg-muted-gray/30 rounded-full"></span>
                        <span>Latency: 12ms</span>
                        <span className="w-1 h-1 bg-slate-300 dark:bg-muted-gray/30 rounded-full"></span>
                        <span>Protocol: v4.2.0-STABLE</span>
                    </div>
                    <p className="text-[9px] text-slate-400 dark:text-muted-gray/40">
                        &copy; {new Date().getFullYear()} Multinode Systems. Authorized access only. All actions are logged.
                    </p>
                </footer>
            </main>

        </div>
    );
}
