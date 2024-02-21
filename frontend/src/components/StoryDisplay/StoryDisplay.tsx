import React, { useState } from "react";
import { Box, Button, MobileStepper, Paper, ThemeProvider, Typography } from "@mui/material";
import './StoryDisplay.scss'
import theme from "../Theme";
import { useLocation } from "react-router-dom";
import Word from "../Word/Word";
import PopupMenu from "../PopupMenu";
import axios from "axios";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

// old design
// interface StoryProps {
//     title: string;
//     summary: string;
//     story: string;
// }

interface StoryProps {
    title: string;
    summary: string;
    story: string[];
}
interface PopupState {
    visible: boolean;
    word: string;
    type: string;
    definition: string;
    x: number;
    y: number;
}
interface DefinitionState {
    word: string;
    type: string;
    definition: string;
}


const StoryDisplay: React.FC = () => {
    const location = useLocation()
    const { data } = location.state as { data: StoryProps }
    const [content, setContent] = useState(data)
    // const words = data.story.split(' ') #old design
    const splitArray: string[][] = data.story.map((str: string) => str.split(' ')); //new design
    const [popup, setPopup] = useState<PopupState>({ visible: false, definition: '', x: 0, y: 0, type: '', word: '' });
    const [definitionList, setDefinitionList] = useState<DefinitionState[]>([])


    const handleWordClick = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, word: string) => {
        let api_input = { "word": word }
        let output = null
        const rect = e.currentTarget.getBoundingClientRect();
        try {
            console.log("Sending to db")
            const response = await axios.post("http://127.0.0.1:5000/api/generate/definition", api_input, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            output = response
        } catch (e) {
            console.log("Error", e);
        }
        setPopup({
            visible: true,
            word: word,
            type: output == null ? `You clicked "${word}" and we couldn't find a definition` : `${output['data']['figure']}`,
            definition: output == null ? `You clicked "${word}" and we couldn't find a definition` : `Definition: "${output['data']['definition']}"`,
            x: rect.left + 10,
            y: rect.bottom + 10,
        });
    };

    const closePopup = async () => {
        setPopup({ ...popup, visible: false });
    };

    const handleOnSaveWord = async () => {
        console.log("Saved word")
        let newItem = { word: popup.word, type: popup.type, definition: popup.definition }
        setDefinitionList(prevItems => [...prevItems, newItem])
        console.log(definitionList)
        closePopup()
    }

    const handleOnRemoveNote = (indexToRemove: number) => {
        setDefinitionList(prevItems =>
            prevItems.filter((_, index) => index !== indexToRemove)
        );
    }
    return (
        <ThemeProvider theme={theme}>
            <div className="story-display" >
                <div className="panels">
                    {/* old design */}
                    {/* <Paper className='content' id='panel-1' elevation={12} square={false}  >
                        {popup.visible && (
                            <PopupMenu onClose={closePopup} onSave={handleOnSaveWord} style={{ top: `${popup.y}px`, left: `${popup.x}px` }}>
                                <Typography variant='h6'>{popup.word}</Typography>
                                <Typography style={{ fontStyle: 'italic' }}>{popup.type}</Typography>
                                {popup.definition}
                            </PopupMenu>
                        )}
                        <Typography variant="h4" color="primary" component="div" sx={{ textAlign: 'center' }}>
                            {data.title}
                        </Typography>
                        <Typography variant="body1" color="primary" component="div" sx={{ textAlign: 'center', fontStyle: 'italic'  }}>
                            {data.summary}
                        </Typography>
                        <Typography variant="body1" component="div">
                            {words.map((word, index) => (
                                <Word key={index} onWordClick={handleWordClick}>
                                    {word}
                                </Word>
                            ))}
                        </Typography>
                    </Paper> */}



                    {/* New design */}
                    <div className="left-panels">
                    <Paper className="content" elevation={6} square={false}>
                    <Typography variant="h4" color="primary" component="div" sx={{ textAlign: 'center' }}>
                            {data.title}
                        </Typography>
                        <Typography variant="body1" color="primary" component="div" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                            {data.summary}
                        </Typography>

                    </Paper>
                    <Paper className='content' id='panel-1' elevation={6} square={false}  >
                        {popup.visible && (
                            <PopupMenu onClose={closePopup} onSave={handleOnSaveWord} style={{ top: `${popup.y}px`, left: `${popup.x}px` }}>
                                <Typography variant='h6'>{popup.word}</Typography>
                                <Typography style={{ fontStyle: 'italic' }}>{popup.type}</Typography>
                                {popup.definition}
                            </PopupMenu>
                        )}

                        <Typography variant="body1" component="div">
                            {splitArray.map((paragraph, index) => (

                                <div key={index}>
                                    {paragraph.map((word, subIndex) => (
                                        <Word key={subIndex} onWordClick={handleWordClick}>
                                            {word}
                                        </Word>
                                    ))}
                                    <br />
                                    <br />
                                </div>
                            ))}
                        </Typography>

                    
                    </Paper>
                    </div>

                    <Paper className='content' id='panel-right' elevation={12} square={false}>
                        <Typography variant="h4" color="primary" component="div" sx={{ textAlign: 'center' }}>
                            Notes
                        </Typography>
                        {definitionList.map((definition, index) => (
                            <Paper elevation={6} square={false} sx={{ backgroundColor: '#f8f9fa', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                                <Typography variant='h6'>{definition.word}</Typography>
                                <Typography style={{ fontStyle: 'italic' }}>{definition.type}</Typography>
                                {definition.definition}
                                <Button color='warning' variant='outlined' onClick={() => handleOnRemoveNote(index)}>Remove</Button>
                            </Paper>
                        ))}

                    </Paper>

                </div>
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
