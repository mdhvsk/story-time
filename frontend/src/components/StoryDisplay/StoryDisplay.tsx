import React from "react";
import {Button, Paper, ThemeProvider, Typography} from "@mui/material";
import './StoryDisplay.scss'
import theme from "../Theme";

const StoryDisplay: React.FC = () => {
    return(
        <ThemeProvider theme={theme}>
        <div className="story-display" >
            <Paper className='content' elevation={12} square={false} color="">
                <Typography variant="h3" component="div">
                    Story
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
