import React from 'react'
import Headbar from '../components/HomePage/Headbar'
import HomePageBanner from '../components/comonCompo/HomePageBanner'
import Logoshow from '../components/comonCompo/Logoshow'
import ShowLaptop from '../components/comonCompo/ShowLaptop'
import BG from '../images/background.jpg'


export default function HomePage() {
  return (
    <div className="absolute inset-0 bg-center bg-no-repeat bg-cover"
    style={{
      backgroundImage: `url(${BG})`, // Correctly passing the image URL
    }}>
      {/* Fixed Headbar */}
      <div className="fixed top-0 left-0 z-50 w-full">
        <Headbar />
      </div>
      
      {/* Scrollable Content */}
      <div className="pt-[80px] overflow-y-auto h-screen">
        <div>
          <HomePageBanner />
        </div>
          <div>
            <div className="flex justify-center">
              <Logoshow />
            </div>
            <div>
              <ShowLaptop />
            </div>
          </div>
      </div>
    </div>
  )
}
