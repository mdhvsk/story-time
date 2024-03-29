import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveNavBar'
import StoryView from '../../components/StoryView/StoryView'
import NavBar from '../../components/Navbar/NavBar'

type Props = {}

const ViewOneStoryPage = (props: Props) => {
  return (
    <div>

        <NavBar/>
        <StoryView/>
    </div>
  )
}

export default ViewOneStoryPage