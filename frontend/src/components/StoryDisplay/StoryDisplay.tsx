import React from "react";
import {Button, Typography} from "@mui/material";
import './StoryDisplay.scss'
const StoryDisplay: React.FC = () => {
    return(
        <div className="story-display">
            <div className='content'>
                <Typography variant="h3" component="div">
                    Hello
                </Typography>
            </div>
            <div className='buttons'>

                <Button color="secondary">Generate </Button>
                <Button variant="contained" color="success">
                    Save
                </Button>
            </div>

        </div>
    )

}

export default StoryDisplay
