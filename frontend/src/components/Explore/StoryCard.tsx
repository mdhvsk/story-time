import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, Typography, styled } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface Tags {
    tag_name: string,
    tag_type: string
}
type Props = {
    id: number,
    title: string,
    name: string,
    summary: string,
    tags: Tags[]


}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const StoryCard = (props: Props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        console.log(props.tags)
        setExpanded(!expanded);
    };
    const navigate = useNavigate()

    const handleReadOnClick = () => {
        const story_input = { 'id': props.id }
        navigate('/story/view', { state: { data: story_input } })
    }
    return (
        <Card sx={{ maxWidth: 345 }}>

            {expanded && <CardHeader

                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.title}
            />}


            {!expanded && <CardHeader

                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.title.substring(0, 15) + "..."}
            />}

            <CardMedia
                component="img"
                height="194"

                image={props.name}
                alt="Picture"
            />




            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <Button size="small" color="primary" sx={{ alignItems: 'right' }} onClick={handleReadOnClick}>
                    Read
                </Button>

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.summary}
                    </Typography>
                    <div>
                        {props.tags.map((tag, index) => (

                            <p className={tag['tag_type']}>
                                {tag['tag_name']}
                            </p>
                        ))}
                    </div>


                </CardContent>
            </Collapse>



        </Card>
    )
}

export default StoryCard