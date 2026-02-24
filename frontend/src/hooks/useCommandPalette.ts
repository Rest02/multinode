"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SUGGESTIONS } from "../data/mockData";

export function useCommandPalette() {
    const router = useRouter();
    const [query, setQuery] = useState("$/notes");
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    /* Global keyboard shortcut cmd+K */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    /* Filter logic */
    const rawQuery = query.replace(/^\$\s*/, "");
    const filtered = rawQuery.startsWith("/")
        ? SUGGESTIONS.filter((s) => s.command.startsWith(rawQuery))
        : SUGGESTIONS;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => (i + 1) % filtered.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
        } else if (e.key === "Escape") {
            inputRef.current?.blur();
        } else if (e.key === "Enter" && filtered[activeIndex]) {
            const selectedCommand = filtered[activeIndex].command;
            setQuery("$ " + selectedCommand);

            // Si el comando es exactamente /notas, navegamos a la mini-app
            if (selectedCommand === "/notas" || selectedCommand === "/notes") {
                router.push("/notas");
            }
        }
    };

    return {
        query,
        setQuery,
        activeIndex,
        setActiveIndex,
        isFocused,
        setIsFocused,
        inputRef,
        filtered,
        handleKeyDown
    };
}
