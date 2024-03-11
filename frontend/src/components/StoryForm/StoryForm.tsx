import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import axios from 'axios'
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
    Box,
    TextField,
    ThemeProvider,
    Paper,
    Typography,
    LinearProgress
} from "@mui/material";
import StoryDisplay from "../StoryDisplay/StoryDisplay";
import { useNavigate } from "react-router-dom";
import Theme from "../Theme";
import './StoryForm.scss'
import { ImagesearchRoller } from "@mui/icons-material";
import { url } from "inspector";

interface IFormInput {
    grade_level: string;
    age: string;
    topic: string;
    length: string;
    details: string;


}


const StoryForm = () => {
    const { control, register, formState: { errors }, handleSubmit, getValues } = useForm<IFormInput>()
    const topics = ['Animals, Bugs, Pets', 'Art, Creativity, Music', 'General Literature', 'Hobbies, Sports, Outdoors', 'Real Life', 'Science and Technology', 'Mystery and Suspense']
    const gradeLevels = ['Kindergarten', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loadingSection, setLoadingSection] = useState('')
    const apiUrl = process.env.REACT_APP_HOST_URL



    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data)
        let api_input = JSON.stringify(data)
        let response_json = { "title": "", "summary": "", "story": "", "image": "", "image_url": "" }
        try {
            console.log("Sending to api")
            setLoading(true)
            setLoadingSection("Generating story")
            const story_response = await axios.post(`http://${apiUrl}:5000/api/generate/story`, api_input, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            response_json["story"] = story_response.data
            setLoadingSection("Generating summary and title")

            let summary_input = { 'prompt': story_response.data }
            const summary_response = await axios.post(`http://${apiUrl}:5000/api/generate/summary+story`, summary_input, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log("Here is summary response")
            console.log(summary_response)
            response_json['summary'] = summary_response.data['summary']
            response_json['title'] = summary_response.data['title']
            console.log(response_json)
            setLoadingSection("Generating image")

            let image_input = {'prompt': response_json['summary']}
            let image_name = await axios.post(`http://${apiUrl}:5000/api/generate/image`, image_input, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            response_json['image'] = image_name.data
            setLoadingSection("Retrieving Image")

            let url_input = {'object_name': response_json['image']}

            let image_url = await axios.post(`http://${apiUrl}:5000/api/get/image`, url_input, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            response_json['image_url'] = image_url.data
            
            navigate('/story', { state: { data: response_json } })
        } catch (e) {
            console.log("Error", e);
        }

    }

    return (
        <>
            <ThemeProvider theme={Theme}>
                <div className="story-form">
                    <Paper className='content' elevation={12} square={false}>
                        <Typography variant="h3" color="primary" component="div" className="header">
                            Generate Story
                        </Typography>
                        <Typography variant='h6' className='sub-header'>What type of story do you want? </Typography>


                        <form className='form' onSubmit={handleSubmit(onSubmit)}>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <FormControl>
                                    <InputLabel id="grade-level-label">Grade Level</InputLabel>
                                    <Controller
                                        name="grade_level"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Select {...field} labelId="grade-level-label" label="Grade Level">
                                                {gradeLevels.map((level) => (
                                                    <MenuItem key={level} value={level}>{level}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>

                                <Controller
                                    name="age"
                                    control={control}
                                    defaultValue=""
                                    rules={{ min: 3, max: 18 }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            type="number"
                                            label="Age"
                                            error={!!errors.age}
                                            helperText={errors.age ? "Age must be between 3 and 18" : ""}
                                        />
                                    )}
                                />
                                <Controller
                                    name="length"
                                    control={control}
                                    defaultValue=""
                                    rules={{ min: 1, max: 10 }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            type="number"
                                            label="Minutes to read"
                                            error={!!errors.length}
                                            helperText={errors.length ? "Length must be between 1 and 10" : ""}
                                        />
                                    )}
                                />
                                <FormControl >
                                    <InputLabel id="topic-label">Topic</InputLabel>
                                    <Controller
                                        name="topic"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Select {...field} labelId="topic-label" label="Topic">
                                                {topics.map((topic) => (
                                                    <MenuItem key={topic} value={topic}>{topic}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                                <Controller
                                    name="details"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField {...field} label="Details" placeholder="Provide any deteils: Interests, characters, etc." />
                                    )}
                                />
                                <Button type="submit" color='primary' variant="contained">Submit</Button>
                                {loading && <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>}
                    <Typography variant='body1' sx={{ textAlign: 'center', fontStyle:'italic' }}>...{loadingSection}</Typography>
                            </Box>
                        </form>
                    </Paper>
                  
                </div>

            </ThemeProvider>
        </>

    );

}

export default StoryForm
