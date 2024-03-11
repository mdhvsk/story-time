import React, { useEffect, useState } from "react";
import { Box, Button, MobileStepper, Paper, ThemeProvider, Typography } from "@mui/material";
import './StoryDisplay.scss'
import theme from "../Theme";
import { useLocation, useNavigate } from "react-router-dom";
import Word from "../Word/Word";
import PopupMenu from "../PopupMenu";
import axios from "axios";
import { Image, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useLocalStorage } from "../../hooks/useLocalStorage";


interface StoryProps {
    title: string;
    summary: string;
    story: string[];
    image: string;
    image_url: string;
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
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const apiUrl = process.env.REACT_APP_HOST_URL




    const handleWordClick = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, word: string) => {
        const wordLower: string = word.toLowerCase();
        const cleanedWord: string = wordLower.replace(/[^a-zA-Z0-9\s]/g, '');
        let api_input = { "word": cleanedWord }
        let output = null
        const rect = e.currentTarget.getBoundingClientRect();
        try {
            console.log("Sending to db")
            const response = await axios.post(`http://${apiUrl}:5000/api/generate/definition`, api_input, {
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
            word: cleanedWord,
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


    const handleOnSaveStory = async () => {
        let user: string | null = sessionStorage.getItem('user')
        if (user == null) {
            setError('no user')
            return
        }
        let user_json = JSON.parse(user)
        let user_id = user_json['id']
        let story_input = { 'title': data['title'], 'summary': data['summary'], 'user_id': user_id, 'text': data.story, 'file_name': data.image, 'notes': definitionList }
        console.log(story_input)

        try {

        const response = await axios.post(`http://${apiUrl}:5000/db/insert/story`, story_input, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        navigate('/stories')

        } catch (e) {
            console.log("Error", e);

        }

    }
    return (
        <ThemeProvider theme={theme}>
            <div className="story-display" >
                <div className="panels">
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
                            <img src={data.image_url} />
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
                    <Button variant="contained" color="success" onClick={handleOnSaveStory}>
                        Save
                    </Button>
                </div>
            </div>
        </ThemeProvider>
    )

}

export default StoryDisplay
