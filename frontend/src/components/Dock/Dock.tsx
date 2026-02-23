import { DOCK_ITEMS } from "../../data/mockData";
import styles from "./Dock.module.css";

export interface DockProps {
    className?: string;
}

export function Dock({ className = "" }: Readonly<DockProps>) {
    return (
        <div className={`${styles.dock} ${className}`}>
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
    );
}
