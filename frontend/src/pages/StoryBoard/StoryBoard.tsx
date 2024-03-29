import { Card } from '@mui/material'
import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveNavBar'
import StoryDisplay from '../../components/StoryDisplay/StoryDisplay'
import NavBar from '../../components/Navbar/NavBar'

type Props = {}


const StoryBoard = (props: Props) => {
  return (
    <>
        <NavBar/>
        <StoryDisplay/>
        
    </>
  )
}

export default StoryBoard