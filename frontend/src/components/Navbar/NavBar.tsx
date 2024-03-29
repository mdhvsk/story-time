import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Book, BookOnline } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../Theme';
import { Image } from "@mui/icons-material";
import { useUser } from '../../hooks/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { log } from 'console';
import { useMediaQuery } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useEffect, useState } from 'react';

const pages = ['Create', 'Stories', 'Notes'];
const links = ['/story/form', '/stories', '/notes']






const NavBar = () => {
    const { user, logout } = useUser();
    const settings = [user?.first_name, 'Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [name, setName] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const current_user: string | null = sessionStorage.getItem('user')
        if (current_user == null) {
            return
        }
        const user_json = JSON.parse(current_user)


    })
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" sx={{bgcolor: 'white', color: 'white'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'black' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            onClick={()=> {navigate}}
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 400,
                                letterSpacing: '.1rem',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Bookmakers.AI
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color: 'black' }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none', color: 'black' },
                                    padding: {xs: '20px', md: '20px'}, 
                                }}
                            >
                               {pages.map((page, index) => (
                            <Link to={links[index]} style={{textDecoration: 'none'}}>
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'black', display: 'block' }}
                                >
                                    {page}
                                </Button>
                                </Link>
                            ))} 
                            </Menu>
                        </Box>
                        <AutoStoriesIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'black'}} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'black',
                                                                textDecoration: 'none',
                            }}
                        >
                            Bookmakers.AI
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, color: 'black' }}>
                            {pages.map((page, index) => (
                            <Link to={links[index]} style={{textDecoration: 'none'}}>
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'black', display: 'block' }}
                                >
                                    {page}
                                </Button>
                                </Link>
                            ))}
                        </Box>

                        <Box sx={{ display:{ xs: 'flex', sm: 'block', md: 'flex' }, alignItems: 'center' }}>
                            <Link to='/explore' >
                                <Button
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={()=>{console.log("clicked")}}
                                
                                    color='success'

                                    sx={{ color: 'white', marginRight: '20px', backgroundColor: 'success.main', borderRadius: '25px', padding: '10px 30px', display:{ xs: 'none', sm: 'inline-block' }}}
                                >
                                    Explore
                                </Button>
                            </Link>
                            <Link to='/'>
                                {/* <Button
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={logout}
                                    sx={{ color: 'warning', marginRight: '20px', backgroundColor: '#e07a5f' }}
                                >
                                    Logout
                                </Button> */}
                                
                            </Link>
                           < IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenUserMenu}
                                color="inherit"
                            >
                                <Avatar />
                            </IconButton>
                                <Menu
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                sx={{
                                    display: {color: 'black' },
                                    padding: {xs: '20px', md: '20px'}, 
                                }}
                            >
                    
                            <Link to='/' style={{textDecoration: 'none'}}>
                                <Button
                                    key="logout"
                                    onClick={logout}
                                    sx={{ my: 2, color: 'black', display: 'block' }}
                                >
                                    Logout
                                </Button>
                                </Link>
                            
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}
export default NavBar;
