import React, { useEffect, useState } from 'react'
import './StoryList.scss'
import axios from 'axios';
import { Button, Paper, ThemeProvider, Typography } from '@mui/material';
import theme from '../Theme';
type Props = {}

interface Story {
    id: number;
    user_id: number;
    title: string;
    summary: string;
}

const StoryList = (props: Props) => {

    const [stories, setStories] = useState<Story[]>([])
    const [error, setError] = useState("")

    useEffect(() => {

        const user: string | null = sessionStorage.getItem('user')
        if (user == null) {
            setError('no user')
            return
        }
        const user_json = JSON.parse(user)
        const user_id = user_json['id']
        const stories_input = { "user_id": user_id }

        const fetchData = async () => {
            try {
                const response = await axios.post<Story[]>('http://127.0.0.1:5000/db/get/stories', stories_input);
                setStories(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <div className='stories-display'>
                <Paper className='content' elevation={12} square={false}>
                    <Typography variant='h3' className='header'>Stories</Typography>
                    <Typography variant='h6' className='sub-header'>All saved stories</Typography>

                    <div className='stories-container'>
                        {stories.map((story, index) => (
                            <Paper elevation={6} square={false} className='story-item'>
                                <div className='left-side-story'>
                                    <Typography variant='h6' sx={{textAlign: 'left'}}>{story.title}</Typography>
                                    <Typography sx={{ fontStyle: 'italic', textAlign: 'left'}}>{story.summary}</Typography>
                                </div>
                                <Button variant='outlined' color='success' className='button'>Go to Story</Button>

                            </Paper>
                        ))}

                    </div>
                </Paper>
            </div>
        </ThemeProvider>

    )
}

export default StoryList