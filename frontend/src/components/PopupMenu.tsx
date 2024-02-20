import React from "react";

interface PopupMenuProps {
    children: React.ReactNode;
    onClose: () => void;
    style?: React.CSSProperties;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ children, onClose, style }) => {
    return (
        <div style={{ ...style, position: 'absolute', border: '1px solid black', padding: '10px', background: 'white' }}>
            {children}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default PopupMenu
