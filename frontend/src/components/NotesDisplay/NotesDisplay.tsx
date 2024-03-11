import { ThemeProvider } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import theme from '../Theme'
import './NotesDisplay.scss'
import { Paper, Typography } from '@mui/material'
import axios from 'axios'
type Props = {}

interface Note {
    definition: string;
    id: number;
    story_id: number;
    type: string;
    user_id: number;
    word: string;
}

const NotesDisplay = (props: Props) => {

    const [notes, setNotes] = useState<Note[]>([])
    const [error, setError] = useState("")

    const apiUrl = process.env.REACT_APP_HOST_URL

    useEffect(() => {

        const user: string | null = sessionStorage.getItem('user')
        if (user == null) {
            setError('no user')
            return
        }
        const user_json = JSON.parse(user)
        const user_id = user_json['id']
        const notes_input = { "user_id": user_id }
        
        const fetchData = async () => {
            try {
                const response = await axios.post<Note[]>(`http://${apiUrl}:5000/db/get/notes`, notes_input);
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <div className='notes-display'>
                <Paper className='content' elevation={12} square={false}>
                    <Typography variant='h3'className='header'>Notes</Typography>
                    <Typography variant='h6' className='sub-header'>All saved vocabulary words</Typography>

                    <div className='notes-grid'>
                        {notes.map((note, index) => (
                                <Paper elevation={6} square={false} className='notes-item'>
                                <Typography variant='h6'>{note.word}</Typography>
                                <Typography style={{ fontStyle: 'italic' }}>{note.type}</Typography>
                                {note.definition}
                                </Paper>
                        ))}

                    </div>
                </Paper>
            </div>
        </ThemeProvider>

    )
}

export default NotesDisplay