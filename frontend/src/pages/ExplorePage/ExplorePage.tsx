import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveNavBar'
import Explore from '../../components/Explore/Explore'

type Props = {}

const ExplorePage = (props: Props) => {
  return (
    <div>
        <ResponsiveAppBar/>
        <Explore/>

    </div>
  )
}

export default ExplorePage