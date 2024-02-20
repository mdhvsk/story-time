import React, {useState} from "react";
import {Button, Paper, ThemeProvider, Typography} from "@mui/material";
import './StoryDisplay.scss'
import theme from "../Theme";
import {useLocation} from "react-router-dom";
import Word from "../Word/Word";
import PopupMenu from "../PopupMenu";

interface StoryProps {
    title: string;
    summary: string;
    story: string;
}
interface PopupState {
    visible: boolean;
    content: string;
    x: number;
    y: number;
}

const StoryDisplay: React.FC = () => {
    const location = useLocation()
    const {data} = location.state as {data: StoryProps}
    const [content, setContent] = useState(data)
    const words = data.story.split(' ')
    const [popup, setPopup] = useState<PopupState>({ visible: false, content: '', x: 0, y: 0 });

    const handleWordClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, word: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPopup({
            visible: true,
            content: `You clicked "${word}"`,
            x: rect.left,
            y: rect.bottom, // Changed from `rect.top + rect.height` for simplicity
        });
    };

    const closePopup = () => {
        setPopup({ ...popup, visible: false });
    };
    return(
        <ThemeProvider theme={theme}>
        <div className="story-display" >
            <Paper className='content' elevation={12} square={false}  >
                {popup.visible && (
                    <PopupMenu onClose={closePopup} style={{ top: `${popup.y}px`, left: `${popup.x}px` }}>
                        {popup.content}
                    </PopupMenu>
                )}
                <Typography variant="h3" color="primary" component="div" sx={{textAlign: 'center'}}>
                    Story
                </Typography>
                <Typography variant="body1" component="div">
                    {/*{data.story}*/}
                    {words.map((word, index) => (
                        <Word key={index} onWordClick={handleWordClick}>
                            {word}
                        </Word>
                    ))}
                </Typography>

            </Paper>

            <div className='buttons'>

                <Button variant="contained" color="warning">Generate </Button>
                <Button variant="contained" color="success">
                    Save
                </Button>
            </div>
        </div>
        </ThemeProvider>
    )

}

export default StoryDisplay
