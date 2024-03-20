import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Slider, styled } from '@mui/material';
import { useState } from 'react';

export default function FilterDrawer() {
    const [open, setOpen] = useState(false);
    const [grade, setGrade] = useState<number[]>([0, 5]);
    const [age, setAge] = useState<number[]>([3, 10]);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const marks = [
        { value: 0, label: 'K' },
        { value: 1, label: '1st' },
        { value: 2, label: '2nd' },
        { value: 3, label: '3rd' },
        { value: 4, label: '4th' },
        { value: 5, label: '5th' },
        { value: 6, label: '6th' },
        { value: 7, label: '7th' },
        { value: 8, label: '8th' },
        { value: 9, label: '9th' },
        { value: 10, label: '10th' },
        { value: 11, label: '11th' },
        { value: 12, label: '12th' },

    ];

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      }));

      
      

    const handleGradeChange = (event: Event, newValue: number | number[]) => {
        setGrade(newValue as number[]);
    };
    const handleAgeChange = (event: Event, newValue: number | number[]) => {
        setAge(newValue as number[]);
    };

    return (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
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


            <ListItemText primary={"Grade Level"} />

            <Box sx={{ width: 200, justifyContent: 'center', paddingLeft: '25px' }}>
                <Slider
                    min={0}
                    max={12}
                    step={1}
                    getAriaLabel={() => 'Temperature range'}
                    value={grade}
                    onChange={handleGradeChange}
                    valueLabelDisplay="on"
                />
            </Box>
            <Divider />


            <Box sx={{ width: 200, justifyContent: 'center', paddingLeft: '25px' }}>
                <Slider
                    min={3}
                    max={18}
                    step={1}
                    getAriaLabel={() => 'Temperature range'}
                    value={age}
                    onChange={handleAgeChange}
                    valueLabelDisplay="on"
                />
            </Box>


            <Divider />
        </Box>
    );
}