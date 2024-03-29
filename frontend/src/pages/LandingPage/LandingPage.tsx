import * as React from 'react';

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../../components/Theme';
import { Image } from "@mui/icons-material";
import { useUser } from '../../hooks/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { log } from 'console';
import { useMediaQuery } from '@mui/material';
import './LandingPage.scss'
const pages = ['Explore', 'Stories', 'Notes'];
const links = ['/explore', '/stories', '/notes']
type Props = {}

const LandingPage = (props: Props) => {

    const navigate = useNavigate()

    const handleSignUp = () => {
        navigate('/register')
    }
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 400,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Talemakers.AI
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                // onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>

                        </Box>


                        <Box sx={{ flexGrow: 0 }}>
                            <Link to='/story/form'>
                                <Button
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleSignUp}

                                    sx={{ fontSize: '0.8rem', color: 'primary', marginRight: '20px', backgroundColor: 'white' }}
                                >
                                    Log In
                                </Button>
                            </Link>
                            <Link to='/register'>
                                <Button
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleSignUp}

                                    sx={{ padding: '10px 30px', backgroundColor: '#81b29a', marginRight: '20px', borderRadius: '25px', color: 'white' }}
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>


            <Box color='success' sx={{ height: '50vh', bgcolor: '#81b29a' }} className='landing-content'>
                <div className='right'>
                    <h1>Custom Stories to Engage <span>Your</span> Reader</h1>
                </div>
                <div className='left'>

                </div>
            </Box>

        </ThemeProvider>
    )
}

export default LandingPage