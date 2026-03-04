"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to initialize session");
            }

            // Save token to localStorage for backward compatibility (Optional)
            localStorage.setItem("multinode_token", data.access_token);

            // Set token in Cookie strictly for Next.js Middleware route protection
            // Expire in 7 days, match the backend JWT expiration maxAge
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 7);
            document.cookie = `multinode_token=${data.access_token}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;

            // Redirect to home
            router.push("/");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form className="space-y-6" onSubmit={handleLogin}>
                {/* Username Field */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-muted-gray ml-1">
                        Identity / Email
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-[18px] text-slate-400 dark:text-muted-gray group-focus-within:text-primary transition-colors">
                                alternate_email
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="terminal_identity@node.01"
                            className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-white/10 rounded-lg py-3.5 pl-11 pr-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-muted-gray/50 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                            autoComplete="username"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-muted-gray ml-1">
                        Access Key
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-[18px] text-slate-400 dark:text-muted-gray group-focus-within:text-primary transition-colors">
                                lock
                            </span>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-white/10 rounded-lg py-3.5 pl-11 pr-12 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-muted-gray/50 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none tracking-widest"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 dark:text-muted-gray hover:text-primary"
                            aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                {showPassword ? "visibility_off" : "visibility"}
                            </span>
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-lg py-2 px-3 text-red-500 text-xs text-center font-mono">
                        {error}
                    </div>
                )}

                {/* Initialize Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-lg flex items-center justify-center gap-3 transition-transform active:scale-[0.98] uppercase tracking-widest text-sm disabled:opacity-70 disabled:active:scale-100 disabled:cursor-not-allowed"
                    >
                        <span>{isLoading ? "AUTHENTICATING..." : "INITIALIZE_SESSION"}</span>
                        <span className="material-symbols-outlined text-[20px]">
                            {isLoading ? "hourglass_top" : "login"}
                        </span>
                    </button>
                </div>
            </form>

            {/* Forgot / Secondary Actions */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5 flex flex-col items-center gap-4">
                <Link href="/forgot" className="text-xs font-medium text-slate-500 dark:text-muted-gray hover:text-primary transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">shield_question</span>
                    Forgot access credentials?
                </Link>
                <p className="text-[11px] text-slate-400 dark:text-muted-gray text-center leading-relaxed">
                    No active clearance? <Link href="/register" className="text-primary hover:underline font-semibold uppercase tracking-tighter">Request Access</Link>
                </p>
            </div>
        </>
    );
}
