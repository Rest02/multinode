import { MenuBar } from "../components/MenuBar/MenuBar";
import { CommandPalette } from "../components/CommandPalette/CommandPalette";
import { Dock } from "../components/Dock/Dock";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.root}>
      {/* ── Top Navigation ── */}
      <MenuBar />

      {/* ── Main Canvas ── */}
      <main className={styles.canvas}>
        <CommandPalette />
      </main>

      {/* ── Bottom Dock ── */}
      <Dock />
    </div>
  );
}
