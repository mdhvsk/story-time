import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveNavBar'
import StoryView from '../../components/StoryView/StoryView'

type Props = {}

const ViewOneStoryPage = (props: Props) => {
  return (
    <div>
        
        <ResponsiveAppBar/>
        <StoryView/>
    </div>
  )
}

export default ViewOneStoryPage