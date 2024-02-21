import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveNavBar'
import StoryForm from '../../components/StoryForm/StoryForm'

type Props = {}

const StoryFormPage = (props: Props) => {
  return (
    <div>
        <ResponsiveAppBar/>
        <StoryForm/>

    </div>
  )
}

export default StoryFormPage