import React from "react";
import {AppBar, Toolbar, Typography, Button, IconButton, Avatar} from "@mui/material";
import {Link} from "react-router-dom";
const NavBar: React.FC = () => {

    return(
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        Story-time
                    </Typography>
                    <Button color="inherit" component={Link} to="/stories" sx={{textAlign: 'left' }}>Stories</Button>
                    <Button color="inherit" component={Link} to="/notes" sx={{textAlign: 'left' }}>Notes</Button>
                    <div style={{ flexGrow: 1 }} />
                    <IconButton color="inherit">
                        <Avatar alt="User Avatar" />
                    </IconButton>
                    <Button color="inherit">Sign Out</Button>
                </Toolbar>
            </AppBar>
    )
}

export default NavBar
