import { ThemeProvider } from "@emotion/react";
import React from "react";
import theme from "./Theme";
import { Button, Paper } from "@mui/material";

interface PopupMenuProps {
    children: React.ReactNode;
    onSave: () => Promise<void>;
    style?: React.CSSProperties;
    onClose: () => void
}

const PopupMenu: React.FC<PopupMenuProps> = ({ children, onClose, style, onSave }) => {
    return (
        <ThemeProvider theme={theme}>
        {/* <div style={{ ...style, position: 'absolute', border: '1px solid black', padding: '10px', background: 'white', display: 'flex', flexDirection: 'column' }}>
            {children}
            <div style={{display: 'flex', gap: '5px', margin: '5px', justifyContent: 'center'}}>
            <Button onClick={onSave} color='success' variant='contained' size='small'>Save</Button>
            <Button onClick={onClose} color='warning' variant='contained' size='small'>Close</Button>
            </div>
        </div> */}
        <Paper elevation={12} square={false} sx={{...style, position: 'absolute', padding: '10px', background: 'white', display: 'flex', flexDirection: 'column', zIndex: '9999'}}>
        {children}
            <div style={{display: 'flex', gap: '5px', margin: '5px', justifyContent: 'center'}}>
            <Button onClick={onSave} color='success' variant='contained' size='small'>Save</Button>
            <Button onClick={onClose} color='warning' variant='contained' size='small'>Close</Button>
            </div>
        </Paper>
        </ThemeProvider>

    );
};

export default PopupMenu
