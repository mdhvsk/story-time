import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveNavBar'
import StoryList from '../../components/StoryList/StoryList'
import NavBar from '../../components/Navbar/NavBar'

type Props = {}

const StoriesPage = (props: Props) => {
  return (
    <div>
        <NavBar/>
        <StoryList/>
    </div>
  )
}

export default StoriesPage