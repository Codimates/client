import React from 'react'
import Headbar from '../components/HomePage/Headbar'
import HomePageBanner from '../components/comonCompo/HomePageBanner'
import Logoshow from '../components/comonCompo/Logoshow'
import ShowLaptop from '../components/comonCompo/ShowLaptop'

export default function HomePage() {
  return (
    <div>
      <Headbar/>
      <div >
        <HomePageBanner/>
      </div>
      <div className='flex justify-center'>
        <Logoshow/>
      </div>
      <div>
        <ShowLaptop/>
      </div>
      
    </div>
  )
}
