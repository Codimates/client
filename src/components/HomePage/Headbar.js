import React from 'react'
import LOGO from '../../images/logo.png'

export default function Headbar() {
  return (
    <div className='bg-[#19191A]'>
        <div className='flex items-center justify-between pt-2 pb-2'>
            <div>
                <img src={LOGO} alt='' className='h-[60px]'></img>
            </div>
            <div>
                <button><label className='text-white'>sign in</label></button>
            </div>
        </div>
        
    </div>
  )
}
