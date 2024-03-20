import { ThemeProvider } from '@emotion/react';
import { Paper, Typography, Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PopupMenu from '../PopupMenu';
import theme from '../Theme';
import Word from '../Word/Word';
import '../StoryDisplay/StoryDisplay.scss'
import { text } from 'stream/consumers';
import Carousel from 'react-material-ui-carousel';
import "./StoryView.scss"


type Props = {}

interface IdProps {
    id: number;
}

interface Story {
    id: number,
    summary: string,
    title: string,
    user_id: number
}


interface Definition {
    word: string;
    type: string;
    definition: string;
}

interface Text {
    sequence: number,
    text_content: string
}

interface Image {
    name: string
}

interface Content {
    image_name: Image[],
    notes: Definition[],
    story: Story,
    text: Text[]
}

interface PopupState {
    visible: boolean;
    word: string;
    type: string;
    definition: string;
    x: number;
    y: number;
}



const StoryView = (props: Props) => {
    const location = useLocation()
    const { data } = location.state as { data: IdProps }
    const [error, setError] = useState('')
    const [definitionList, setDefinitionList] = useState<Definition[]>([])
    const [content, setContent] = useState<Content>()
    const [popup, setPopup] = useState<PopupState>({ visible: false, definition: '', x: 0, y: 0, type: '', word: '' });
    const [splitArray, setSplitArray] = useState<string[][]>()
    const [imageUrl, setImageUrl] = useState("")
    const apiUrl = process.env.REACT_APP_HOST_URL

    useEffect(() => {

        const story_id = data.id
        if (story_id == null) {
            setError('no user')
            return
        }

        const stories_input = { "id": story_id }

        const fetchData = async () => {
            try {
                const response = await axios.post(`http://${apiUrl}:5000/db/get/all/content`, stories_input);
                console.log(response)
                setContent(response.data)
                console.debug(content)
                console.log("****************")
                const image_name = response.data.image_name[0]['name']
                // const splitArray = content?.text.text_content.map((str: string) => str.split(' '))
                let definitions = response.data.notes
                setDefinitionList(definitions)


                let text_list = response.data.text
                let story = []
                for (let i = 0; i < text_list.length; i++) {
                    story.push(text_list[i]['text_content'])
                }
                setSplitArray(story.map((str: string) => str.split(' ')))

                const image_url = await axios.post(`http://${apiUrl}:5000/api/get/image`, { 'object_name': image_name })
                setImageUrl(image_url.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        fetchData();
    }, [])


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

    return (
        <ThemeProvider theme={theme}>
            <div className="story-display" >
                <div className="panels">
                    <div className="left-panels">
                        <Paper className="content" elevation={6} square={false}>
                            <Typography variant="h5" color="primary" component="div" sx={{ textAlign: 'center' }}>
                                {content?.story.title}
                            </Typography>
                            <Typography variant="body2" color="primary" component="div" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                                {content?.story.summary}
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
                            {/* <img src={imageUrl} alt={imageUrl} style={{ width: '50%' }} /> */}

                            {/* <Typography variant="body1" component="div">
                                {splitArray?.map((paragraph, index) => (
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
                            </Typography> */}

                            <div className = "reading" >
                                <img src={imageUrl} alt={imageUrl} style={{ width: '50%' }} />

                                <Carousel 
                                    className="carousel"
                                    next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
                                    prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}
                                    sx={{  }}
                                    autoPlay={false}
                                    >
                                    {splitArray?.map((paragraph, index) => (
                                        <div key={index}>
                                            {paragraph.map((word, subIndex) => (
                                                <Word key={subIndex} onWordClick={handleWordClick}>
                                                    {word}
                                                </Word>
                                            ))}
                                        </div>

                                    ))}
                                </Carousel>

                            </div>

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
                </div>
            </div>
        </ThemeProvider>
    )
}

export default StoryView