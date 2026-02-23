"use client";

import { useCommandPalette } from "../../hooks/useCommandPalette";
import styles from "./CommandPalette.module.css";

export interface CommandPaletteProps {
    className?: string;
}

export function CommandPalette({ className = "" }: Readonly<CommandPaletteProps>) {
    const {
        query,
        setQuery,
        activeIndex,
        setActiveIndex,
        isFocused,
        setIsFocused,
        inputRef,
        filtered,
        handleKeyDown
    } = useCommandPalette();

    return (
        <div className={`${styles.palette} ${className}`}>
            {/* ── Input Row ── */}
            <div className={`${styles.inputRow} ${isFocused ? styles.inputFocused : ""}`}>
                <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                    ref={inputRef}
                    id="command-input"
                    className={styles.commandInput}
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    onKeyDown={handleKeyDown}
                    placeholder="$ /"
                    spellCheck={false}
                    autoComplete="off"
                    aria-label="Command input"
                />
                <div className={styles.inputRight}>
                    <kbd className={styles.kbdKey}>ESC</kbd>
                    <button className={styles.settingsBtn} aria-label="Settings">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* ── Suggestions ── */}
            <div className={styles.suggestionsSection}>
                <span className={styles.sectionLabel}>SUGGESTIONS</span>

                <ul className={styles.suggestionList} role="listbox">
                    {filtered.map((item, i) => {
                        const isActive = activeIndex === i;
                        return (
                            <li
                                key={item.id}
                                role="option"
                                aria-selected={isActive}
                                className={`${styles.suggestionRow} ${isActive ? styles.suggestionActive : ""}`}
                                onMouseEnter={() => setActiveIndex(i)}
                                onClick={() => setQuery("$ " + item.command)}
                            >
                                <div
                                    className={styles.suggestionIconWrap}
                                    style={{
                                        background: i === 0 ? "var(--accent)" : "#1e3a28",
                                        border: `1px solid ${i === 0 ? "rgba(240,180,41,0.4)" : "rgba(52,199,89,0.2)"}`,
                                    }}
                                >
                                    <span className={styles.suggestionIconEmoji}>{item.emoji}</span>
                                </div>

                                <div className={styles.suggestionText}>
                                    <span className={styles.suggestionLabel}>{item.label}</span>
                                    <span className={styles.suggestionSub}>{item.sublabel}</span>
                                </div>

                                {isActive && (
                                    <div className={styles.suggestionAction}>
                                        <span>↩</span>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* ── Status Bar ── */}
            <div className={styles.statusBar}>
                <div className={styles.statusLeft}>
                    <span className={styles.statusKey}>↑↓</span>
                    <span className={styles.statusLabel}>NAV</span>
                    <span className={styles.statusSep} />
                    <span className={styles.statusKey}>⌘</span>
                    <span className={styles.statusLabel}>RUN</span>
                    <span className={styles.statusSep} />
                    <span className={styles.statusKey}>TAB</span>
                    <span className={styles.statusLabel}>OPTS</span>
                </div>
                <div className={styles.statusRight}>
                    <span className={styles.statusDot} />
                    <span className={styles.statusLabel}>CONNECTED</span>
                </div>
            </div>
        </div>
    );
}
