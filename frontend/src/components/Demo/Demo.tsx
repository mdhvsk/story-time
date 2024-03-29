import React from 'react'
import './Demo.scss'
import { Box, Button, Drawer, Grid, Paper, ThemeProvider, Typography } from '@mui/material'
import theme from '../Theme'
import StoryCard from '../Explore/StoryCard'
import FilterDrawer from '../FilterDrawer/FilterDrawer'
import data from './demo-data.json'
import { StoryPreview } from '../../hooks/Types'
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import Person2Icon from '@mui/icons-material/Person2';
import PoolIcon from '@mui/icons-material/Pool';
import { AutoStories } from '@mui/icons-material'
import { Link } from 'react-router-dom'

type Props = {}

const Demo = (props: Props) => {
    const responseData: StoryPreview[] = data.storyCards

    return (
        <ThemeProvider theme={theme}>


            <div className='demo'>
                <div className='demo-header'>

                    <Box className='left'>
                        <h1>
                            We build custom stories to match <span className='span'> YOU </span>
                        </h1>
                        <ul>
                            <li>Build stories based off your interest</li>
                            <li>Match stories to you reading level</li>
                            <li>AI Generate your custom story</li>
                        </ul>
                        <Link to='/explore'>
                                <Button
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                
                                    color='success'

                                    sx={{ color: 'white', margin: '10px', backgroundColor: 'success.main', borderRadius: '25px', padding: '10px 30px' }}
                                >
                                    Explore
                                </Button>
                            </Link>
                    </Box>
                    <img className='right' src='demoheader.png' />
                </div>
                <div className='demo-description' >
                    <h1>
                       Generate stories using these attributes
                    </h1>
                  

                    <Grid className='demo-attribute-list' container rowSpacing={3} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                        <Grid item className='demo-attribute'  sm={5} md={4} lg={1} xl={2}>
                        <SchoolIcon color='primary' fontSize='large' sx={{ backgroundColor: 'secondary.main', padding: '20px', borderRadius: '25px' }} />
                            <h3>Reading Level</h3>
                        </Grid>
                        <Grid item className='demo-attribute' sm={5} md={4} lg={1} xl={2}>
                        <AccessTimeIcon color='info' fontSize='large' sx={{ backgroundColor: 'success.main', padding: '20px', borderRadius: '25px' }} />
                            <h3>Story Length</h3>
                        </Grid>
                        <Grid item className='demo-attribute' sm={5} md={4} lg={1} xl={2}>
                        <PoolIcon color='info' fontSize='large' sx={{ backgroundColor: 'warning.main', padding: '20px', borderRadius: '25px' }} />
                            <h3>Interests</h3>
                        </Grid>
                        <Grid item className='demo-attribute' sm={5} md={4} lg={1} xl={2}>
                        <Person2Icon color='info' fontSize='large' sx={{ backgroundColor: 'primary.main', padding: '20px', borderRadius: '25px' }} />
                            <h3>Age</h3>
                        </Grid>

                        <Grid item className='demo-attribute' sm={5} md={4} lg={1} xl={2}>
                            <DesignServicesIcon color='primary' fontSize='large' sx={{ backgroundColor: 'info.main', padding: '20px', borderRadius: '25px' }} />
                            <h3>Details</h3>
                        </Grid>

                    </Grid>

                </div>

                {/* <div className='stories-display'> */}
                <div className='demo-content' >
                    <h1>
                        Stories for all ages and interests
                    </h1>
                    <Grid className='grid' container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {responseData.map((story, index) => (
                            <Grid item sm={6} md={4} lg={3} xl={2}>
                                <StoryCard {...story} demo={true} />
                            </Grid>
                        ))}
                    </Grid>
                </div>

                {/* </div> */}
            </div>
        </ThemeProvider>

    )
}

export default Demo