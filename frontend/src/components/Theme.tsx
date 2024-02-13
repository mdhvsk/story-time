import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        primary: {
            // black
            main: '#3d405b',
        },
        secondary: {
            // tan
            main: '#f2cc8f',

        },
        success: {
            // green
            main: '#81b29a',

        },
        warning: {
            // orange
            main: '#e07a5f',

        },
        info: {
            // gray
            main: '#f4f1de',
        },
    },
});

export default theme