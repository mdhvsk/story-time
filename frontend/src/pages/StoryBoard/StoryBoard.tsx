import { Card } from '@mui/material'
import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveNavBar'
import StoryDisplay from '../../components/StoryDisplay/StoryDisplay'

type Props = {}


const StoryBoard = (props: Props) => {
  return (
    <>
        <ResponsiveAppBar/>
        <StoryDisplay/>
        
    </>
  )
}

export default StoryBoard