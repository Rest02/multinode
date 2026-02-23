"use client";

import { useClock } from "../../hooks/useClock";
import { MENU_ITEMS } from "../../data/mockData";
import styles from "./MenuBar.module.css";

export interface MenuBarProps {
    className?: string;
}

export function MenuBar({ className = "" }: Readonly<MenuBarProps>) {
    const time = useClock();

    return (
        <header className={`${styles.menuBar} ${className}`}>
            <div className={styles.menuLeft}>
                <span className={styles.appIcon} aria-label="Multinode">
                    <span className={styles.appIconDot} />
                </span>
                <span className={styles.appName}>Multinode</span>
                {MENU_ITEMS.map((item) => (
                    <button key={item} className={styles.menuItem}>
                        {item}
                    </button>
                ))}
            </div>

            <div className={styles.menuRight}>
                <button className={styles.zenMode}>
                    <span>🌙</span> ZEN MODE
                </button>
                <button className={styles.menuIcon} aria-label="Search">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                </button>
                <button className={styles.menuIcon} aria-label="Menu">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
                <span className={styles.clock}>{time}</span>
            </div>
        </header>
    );
}
