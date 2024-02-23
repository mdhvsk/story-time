import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveNavBar'
import { ThemeProvider } from '@emotion/react'
import theme from '../../components/Theme'
import NotesDisplay from '../../components/NotesDisplay/NotesDisplay'

type Props = {}

const NotesPage = (props: Props) => {
  return (
    <div>
        <ResponsiveAppBar/>
        <NotesDisplay/>
    </div>
  )
}

export default NotesPage