'use client'
import React from 'react'
import { UseUser } from '@/app/provider'
import Image from 'next/image';
const WelcomeComponent = () => {
  const { user } = UseUser();



  return (
   

    <div className='bg-white rounded-2xl p-5 w-full flex justify-between items-center'>
      <div >

      <h1 className='font-bold text-lg text-primary'>Welcome Back , {user?.name} </h1>
      <h2 className='text-gray-500 font-semibold'>AI Driven Interviews</h2>
      </div>
{/* {user && <Image src={user?.pictures} alt='no image' height={50} width={50}/>} */}
    </div>

  )
}

export default WelcomeComponent
