import React from 'react'
import Featured from '../components/Featured'
import FeaturedProperties from '../components/FeaturedProperties'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MailList from '../components/MailList'
import Navbar from '../components/Navbar'
import PropertyList from '../components/PropertyList'
import "./Home.css"
function Home() {
  return (
      <>  
      <Navbar />
      <Header />
      <div className="homeContainer">
          <Featured />
          <h1 className="homeTitle">
              Browse by Property type
          </h1>
          <PropertyList />
          <h1 className='homeTitle'>Homes guests love</h1>
          <FeaturedProperties /> 
          <MailList />
          <Footer />
      </div>
      </>
  )
}

export default Home