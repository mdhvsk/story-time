import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveNavBar'
import StoryForm from '../../components/StoryForm/StoryForm'
import NavBar from '../../components/Navbar/NavBar'

type Props = {}

const StoryFormPage = (props: Props) => {
  return (
    <div>
        <NavBar/>
        <StoryForm/>

    </div>
  )
}

export default StoryFormPage