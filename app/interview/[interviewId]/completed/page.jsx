'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const InterviewCompleted = () => {
  const router  = useRouter()
  useEffect(()=>{
setTimeout(() => {
  router.refresh()
  console.log('refreshed');
  
}, 100);

  },[])
  return (
    <div className='bg-white flex flex-col gap-5 justify-center items-center p-14'>
      <h1 className='text-3xl font-bold'> Interview Completed</h1>
<Image src={'/interview-completed.avif'} height={300} width={300} alt='interviewimage'/>
<h2 className='font-medium text-sm text-accent-foreground'>Thanks for your participation in AI-driven Interview with AI Recuiter</h2>
    </div>
  )
}

export default InterviewCompleted
