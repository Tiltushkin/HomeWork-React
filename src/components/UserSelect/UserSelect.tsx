import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./UserSelect.module.scss";
import type { UserStat } from "../../shared/hooks/useTodos";

type Value = number | "all";

type AllOption = { key: string; id: "all"; label: string };
type UserOption = {
  key: string;
  id: number;
  label: string;
  total: number;
  completed: number;
  incomplete: number;
};
type Option = AllOption | UserOption;

interface Props {
  label?: string;
  value: Value;
  onChange: (v: Value) => void;
  users: UserStat[];
  disabled?: boolean;
  className?: string;
}

function isUserOption(o: Option): o is UserOption {
  return o.id !== "all";
}

export default function UserSelect({
  label = "Пользователь",
  value,
  onChange,
  users,
  disabled,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const options: Option[] = useMemo(
    () => [
      { key: "all", id: "all", label: "Все пользователи" },
      ...users.map<Option>((u) => ({
        key: String(u.id),
        id: u.id,
        label: `user ${u.id}`,
        total: u.total,
        completed: u.completed,
        incomplete: u.incomplete,
      })),
    ],
    [users]
  );

  const selectedIndex = useMemo(() => {
    const idx = options.findIndex((o) => o.id === value);
    return idx === -1 ? 0 : idx;
  }, [options, value]);

  const [activeIndex, setActiveIndex] = useState<number>(selectedIndex);
  useEffect(() => setActiveIndex(selectedIndex), [selectedIndex, open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !listRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!open) {
      if (["ArrowDown", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[activeIndex];
      onChange(opt.id);
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      <span className={styles.label}>{label}</span>

      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${disabled ? styles.disabled : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((s) => !s)}
        onKeyDown={onKeyDown}
      >
        <span className={styles.value}>
          {value === "all" ? "Все пользователи" : `user ${value}`}
        </span>
        <svg
          className={`${styles.chevron} ${open ? styles.open : ""}`}
          width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          className={styles.dropdown}
          onKeyDown={onKeyDown}
        >
          {options.map((opt, i) => {
            const isSel = value === opt.id;
            const ratio =
              isUserOption(opt) && opt.total > 0
                ? opt.completed / opt.total
                : undefined;

            return (
              <div
                key={opt.key}
                role="option"
                aria-selected={isSel}
                className={`${styles.item} ${i === activeIndex ? styles.active : ""} ${
                  isSel ? styles.selected : ""
                }`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  onChange(opt.id);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
              >
                <div className={styles.left}>
                  <div className={styles.avatar}>
                    {opt.id === "all" ? "★" : String(opt.id)}
                  </div>
                  <div className={styles.meta}>
                    <div className={styles.title}>{opt.label}</div>
                    {isUserOption(opt) && (
                      <div className={styles.sub}>
                        всего {opt.total} · выполнено {opt.completed} · в работе {opt.incomplete}
                      </div>
                    )}
                  </div>
                </div>

                {typeof ratio === "number" && (
                  <div className={styles.right}>
                    <div className={styles.progress}>
                      <div className={styles.bar} style={{ width: `${Math.round(ratio * 100)}%` }} />
                    </div>
                    <span className={styles.pct}>{Math.round(ratio * 100)}%</span>
                  </div>
                )}

                {isSel && <span className={styles.check}>✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}