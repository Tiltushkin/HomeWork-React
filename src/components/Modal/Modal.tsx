import React from 'react';
import s from './Modal.module.scss';

type Props = {
    title?: string;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ title, onClose, children }) => {
    return (
        <div className={s.backdrop} onClick={onClose}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <div className={s.header}>
                <div className={s.title}>{title}</div>
                <button className={s.closeBtn} aria-label="Close" onClick={onClose}>&times;</button>
            </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;