export interface Suggestion {
    id: string;
    command: string;
    label: string;
    sublabel: string;
    icon: string;
    iconBg: string;
    emoji: string;
}

export const SUGGESTIONS: Suggestion[] = [
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

export const DOCK_ITEMS = [
    { id: "mail", icon: "✉", label: "Mail", accent: false },
    { id: "calendar", icon: "📅", label: "Calendar", accent: false },
    { id: "new", icon: "+", label: "New Node", accent: true },
    { id: "media", icon: "⊞", label: "Media", accent: false },
    { id: "profile", icon: "◉", label: "Profile", accent: false },
];

export const MENU_ITEMS = ["File", "Edit", "View", "Window", "Help"];
