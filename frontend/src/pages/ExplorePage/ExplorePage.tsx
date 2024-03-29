import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveNavBar'
import Explore from '../../components/Explore/Explore'
import NavBar from '../../components/Navbar/NavBar'

type Props = {}

const ExplorePage = (props: Props) => {
  return (
    <div>
        <NavBar/>
        <Explore/>

    </div>
  )
}

export default ExplorePage