import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import s from './Select.module.scss';

export type SelectOption = { label: string; value: string | number };

interface SelectProps {
  options: SelectOption[];
  value: string | number;
  onChange: (val: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md';
  ariaLabel?: string;
}

const KEY = {
  ENTER: 'Enter',
  ESC: 'Escape',
  SPACE: ' ',
  TAB: 'Tab',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End',
} as const;

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  disabled,
  className,
  size = 'md',
  ariaLabel,
}) => {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const selectedIndex = useMemo(
    () => options.findIndex((o) => o.value === value),
    [options, value]
  );

  const selectedLabel = selectedIndex >= 0 ? options[selectedIndex].label : '';

    const updatePosition = () => {
        const el = triggerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setCoords({ top: rect.bottom, left: rect.left, width: rect.width });
    };

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, true);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t)) return;
      if (menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

    useLayoutEffect(() => {
        if (!open || !coords) return;
        setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
        requestAnimationFrame(() => menuRef.current?.focus({ preventScroll: true }));
    }, [open, coords, selectedIndex]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, [open]);

  const openMenu = () => !disabled && setOpen(true);
  const closeMenu = () => setOpen(false);

  const selectAt = (idx: number) => {
    const opt = options[idx];
    if (!opt) return;
    onChange(opt.value);
    closeMenu();
    triggerRef.current?.focus();
  };

    const onTriggerKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
            case KEY.ENTER:
            case KEY.SPACE:
            case KEY.DOWN:
            case KEY.UP:
                e.preventDefault();
                setOpen(true);
            break;
            default:
        }
    };

  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === KEY.ESC) {
      e.preventDefault();
      closeMenu();
      return;
    }
    if (e.key === KEY.TAB) {
      closeMenu();
      return;
    }
    if (e.key === KEY.DOWN) {
      e.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
      return;
    }
    if (e.key === KEY.UP) {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
      return;
    }
    if (e.key === KEY.HOME) {
      e.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (e.key === KEY.END) {
      e.preventDefault();
      setActiveIndex(options.length - 1);
      return;
    }
    if (e.key === KEY.ENTER || e.key === KEY.SPACE) {
      e.preventDefault();
      if (activeIndex >= 0) selectAt(activeIndex);
      return;
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cn(s.selectTrigger, s[`size_${size}`], className)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onTriggerKeyDown}
        disabled={disabled}
      >
        <span className={cn(s.value, !selectedLabel && s.placeholder)}>
          {selectedLabel || placeholder}
        </span>
        <svg className={s.caret} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </button>

      {open &&
        createPortal(
          <>
            <div className={s.overlay} onClick={closeMenu} />
            <div
              ref={menuRef}
              className={s.menu}
              tabIndex={-1}
              role="listbox"
              aria-activedescendant={activeIndex >= 0 ? `opt-${activeIndex}` : undefined}
              onKeyDown={onMenuKeyDown}
              style={coords ? { top: coords.top, left: coords.left, minWidth: coords.width, position: 'fixed' as const } : undefined}
            >
              <div className={s.menuInner}>
                {options.map((opt, i) => {
                  const selected = value === opt.value;
                  const active = i === activeIndex;
                  return (
                    <div
                      id={`opt-${i}`}
                      key={String(opt.value)}
                      role="option"
                      aria-selected={selected}
                      className={cn(s.option, selected && s.optionSelected, active && s.optionActive)}
                      onMouseEnter={() => setActiveIndex(i)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => selectAt(i)}
                    >
                      <span className={s.optionLabel}>{opt.label}</span>
                      {selected && (
                        <svg width="16" height="16" viewBox="0 0 24 24" className={s.check} aria-hidden="true">
                          <path d="M20.285 6.709l-11.4 11.4-5.657-5.657 1.414-1.414 4.243 4.243 9.986-9.986z" />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
};

export default Select;