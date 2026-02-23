"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";

/* ─── Types ───────────────────────────────────────────────── */
interface Suggestion {
  id: string;
  command: string;
  label: string;
  sublabel: string;
  icon: string;
  iconBg: string;
  emoji: string;
}

/* ─── Data ────────────────────────────────────────────────── */
const SUGGESTIONS: Suggestion[] = [
  {
    id: "notes",
    command: "/notes",
    label: "Create new daily note",
    sublabel: "Add to /personal/journal",
    icon: "📄",
    iconBg: "#f0b429",
    emoji: "📄",
  },
  {
    id: "health",
    command: "/health",
    label: "Health & Wellness",
    sublabel: "Track activity and meditation",
    icon: "💚",
    iconBg: "#1a3a1a",
    emoji: "🫀",
  },
  {
    id: "studies",
    command: "/studies",
    label: "Studies & Research",
    sublabel: "Review flashcards and bibliography",
    icon: "📗",
    iconBg: "#1a3a20",
    emoji: "📗",
  },
  {
    id: "habits",
    command: "/habits",
    label: "Daily Habits",
    sublabel: "Complete recurring tasks",
    icon: "🔄",
    iconBg: "#1a3a2a",
    emoji: "🔄",
  },
];

const DOCK_ITEMS = [
  { id: "mail", icon: "✉", label: "Mail", accent: false },
  { id: "calendar", icon: "📅", label: "Calendar", accent: false },
  { id: "new", icon: "+", label: "New Node", accent: true },
  { id: "media", icon: "⊞", label: "Media", accent: false },
  { id: "profile", icon: "◉", label: "Profile", accent: false },
];

/* ─── Component ───────────────────────────────────────────── */
export default function Home() {
  const [query, setQuery] = useState("$/notes");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [time, setTime] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  /* Live clock */
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

  /* Global keyboard shortcut */
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

  /* Filtered suggestions */
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
      // would open the module
      setQuery("$ " + filtered[activeIndex].command);
    }
  };

  return (
    <div className={styles.root}>

      {/* ── macOS-style menu bar ─────────────────────────────── */}
      <header className={styles.menuBar}>
        <div className={styles.menuLeft}>
          <span className={styles.appIcon} aria-label="Multinode">
            <span className={styles.appIconDot} />
          </span>
          <span className={styles.appName}>Multinode</span>
          {["File", "Edit", "View", "Window", "Help"].map((item) => (
            <button key={item} className={styles.menuItem}>{item}</button>
          ))}
        </div>
        <div className={styles.menuRight}>
          <button className={styles.zenMode}>
            <span>🌙</span> ZEN MODE
          </button>
          <button className={styles.menuIcon} aria-label="Search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
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

      {/* ── Canvas (empty) ───────────────────────────────────── */}
      <main className={styles.canvas}>

        {/* ── Command Palette ── */}
        <div className={styles.palette}>

          {/* Search input row */}
          <div className={`${styles.inputRow} ${isFocused ? styles.inputFocused : ""}`}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
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

          {/* Divider + suggestions */}
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
                    {/* Icon */}
                    <div
                      className={styles.suggestionIconWrap}
                      style={{
                        background: i === 0 ? "var(--accent)" : "#1e3a28",
                        border: `1px solid ${i === 0 ? "rgba(240,180,41,0.4)" : "rgba(52,199,89,0.2)"}`,
                      }}
                    >
                      <span className={styles.suggestionIconEmoji}>{item.emoji}</span>
                    </div>

                    {/* Text */}
                    <div className={styles.suggestionText}>
                      <span className={styles.suggestionLabel}>{item.label}</span>
                      <span className={styles.suggestionSub}>{item.sublabel}</span>
                    </div>

                    {/* Right action — only on active */}
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

          {/* Status bar */}
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
      </main>

      {/* ── Dock ─────────────────────────────────────────────── */}
      <div className={styles.dock}>
        <div className={styles.dockInner}>
          {DOCK_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`${styles.dockBtn} ${item.accent ? styles.dockBtnAccent : ""}`}
              aria-label={item.label}
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
