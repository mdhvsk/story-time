import React, {useState} from "react";
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
    Typography
} from "@mui/material";
import StoryDisplay from "../StoryDisplay/StoryDisplay";
import {useNavigate} from "react-router-dom";
import Theme from "../Theme";
import './StoryForm.scss'

interface IFormInput {
    grade_level: string;
    age: string;
    topic: string;
    length: string;
    details: string;


}


const StoryForm = () => {
    const {control, register, formState: { errors }, handleSubmit, getValues} = useForm<IFormInput>()
    const topics = ['Animals, Bugs, Pets', 'Art, Creativity, Music', 'General Literature', 'Hobbies, Sports, Outdoors', 'Real Life', 'Science and Technology', 'Mystery and Suspense']
    const gradeLevels = ['K', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data)
        let api_input = JSON.stringify(data)
        let response_json = {"title": "", "summary": "", "story": ""}
        try {
            console.log("Sending to api")
            const story_response = await axios.post("http://127.0.0.1:5000/api/generate/story", api_input, {
                headers: {
                    'Content-Type': 'application/json',
                }})
            console.log(story_response.data);
            response_json["story"] = story_response.data
            let summary_input = {'prompt': story_response.data}
            const summary_response = await axios.post("http://127.0.0.1:5000/api/generate/summary", summary_input, {
                headers: {
                    'Content-Type': 'application/json',
                }})
            response_json["summary"] = summary_response.data
            console.log(response_json)
            navigate('/', {state: {data: response_json}})
        } catch (e) {
            console.log("Error", e);
        }

    }

    return (
        <>
            <ThemeProvider theme={Theme}>
                <div className="story-form">
                    <Paper className='content' elevation={12} square={false}  >
                        <Typography variant="h3" color="primary" component="div" sx={{textAlign: 'center'}}>
                            Story
                        </Typography><form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="column"  gap={2}>
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
                            <TextField {...field} label="Details" placeholder="Provide any deteils: Interests, characters, etc."/>
                        )}
                    />
                <Button type="submit" color='primary' variant="contained">Submit</Button>

                </Box>

            </form>
                    </Paper>

                </div>

            </ThemeProvider>
        </>

    );

}

export default StoryForm
