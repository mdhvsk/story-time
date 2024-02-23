import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveNavBar'
import StoryList from '../../components/StoryList/StoryList'

type Props = {}

const StoriesPage = (props: Props) => {
  return (
    <div>
        <ResponsiveAppBar/>
        <StoryList/>
    </div>
  )
}

export default StoriesPage