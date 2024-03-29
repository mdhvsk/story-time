import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StoryCard from './StoryCard'
import { Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, ThemeProvider, Typography, styled } from '@mui/material'
import "./Explore.scss"
import FilterDrawer from '../FilterDrawer/FilterDrawer'
import theme from '../Theme'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MailIcon from '@mui/icons-material/Mail';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { VariableSizeList } from 'react-window'
import { StoryPreview } from '../../hooks/Types'
import { useUser } from '../../hooks/UserContext'


type Props = {}

// interface StoryPreview {
//     id: number,
//     title: string,
//     summary: string,
//     name: string
//     tags: Tags[]
// }

interface ImageUrl {

}

interface Tags {
    tag_name: string,
    tag_type: string
}

const Explore = (props: Props) => {
    const [responseData, setResponseData] = useState<StoryPreview[]>([])
    const [presignedUrl, setPresignedUrl] = useState<String[]>([])
    const apiUrl = process.env.REACT_APP_HOST_URL
    const [open, setOpen] = React.useState(false);
    const { setStories } = useUser();


    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        console.log("Stories:")
        // const stories: StoryPreview[] | null = sessionStorage.getItem('stories')
        // console.log(stories)
        const fetchData = async () => {
            try {
                const response = await axios.post(`http://${apiUrl}:5000/db/get/stories/explore`)
                console.log(response)
                let cardInfo = response.data
                // if (cardInfo.length === stories.length){

                
                for (let i = 0; i < cardInfo.length; i++) {
                    const image_input = { 'object_name': cardInfo[i]['name'] }
                    const image_response = await axios.post(`http://${apiUrl}:5000/api/get/image`, image_input, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    cardInfo[i]['name'] = image_response.data

                    const tags_input = { "story_id": cardInfo[i]['id'] }
                    const tags_response = await axios.post(`http://${apiUrl}:5000/db/select/tags`, tags_input, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    cardInfo[i]['tags'] = tags_response.data

                }

                
                setResponseData(cardInfo)
                setStories(cardInfo)
                


            }
            catch (error) {
                console.error('Error fetching data:', error);

            }
        }
        fetchData()

    }, [])

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const drawerWidth = 240;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <div className='stories-display'>
                <Paper className='explore-content' elevation={12} square={false}>
                    <Typography variant='h3' className='header'>Stories</Typography>
                    <Typography variant='h6' className='sub-header'>All saved stories</Typography>

                    <Button onClick={toggleDrawer(true)}>Open drawer</Button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        <FilterDrawer />
                    </Drawer>
                    <Grid className='grid' container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {responseData.map((story, index) => (
                            <Grid className='item' item sm={6} md={4} lg={3} xl={2}>
                                <StoryCard {...story} demo={false} />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

            </div>





        </ThemeProvider>
    )
}

export default Explore