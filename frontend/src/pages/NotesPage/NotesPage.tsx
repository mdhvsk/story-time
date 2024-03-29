import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveNavBar'
import { ThemeProvider } from '@emotion/react'
import theme from '../../components/Theme'
import NotesDisplay from '../../components/NotesDisplay/NotesDisplay'
import NavBar from '../../components/Navbar/NavBar'

type Props = {}

const NotesPage = (props: Props) => {
  return (
    <div>
        <NavBar/>
        <NotesDisplay/>
    </div>
  )
}

export default NotesPage