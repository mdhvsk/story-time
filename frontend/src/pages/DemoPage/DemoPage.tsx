import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveNavBar'
import Demo from '../../components/Demo/Demo'
import NavBar from '../../components/Navbar/NavBar'
import Footer from '../../components/Footer/Footer'

type Props = {}

const DemoPage = (props: Props) => {
  return (
    <div>
        <NavBar/>
        <Demo/>
        <Footer/>
    </div>
  )
}

export default DemoPage