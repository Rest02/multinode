"use client";

import { useState, useEffect } from "react";

export function useClock() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(
                now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) +
                " " +
                now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
            );
        };

        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    return time;
}
