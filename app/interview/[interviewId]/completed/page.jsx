'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const InterviewCompleted = () => {
  const router  = useRouter()
  useEffect(()=>{
setTimeout(() => {
  router.refresh()
toast('Check Your Feedback From Dashboard!');
  
}, 300);


  },[])
  return (
    <div className='bg-white flex flex-col gap-5 justify-center items-center p-14'>
      <h1 className='text-3xl font-bold'> Interview Completed</h1>
<Image src={'/interview-completed.avif'} height={300} width={300} alt='interviewimage'/>
<h2 className='font-medium text-sm text-accent-foreground'>Thanks for your participation in AI-driven Interview with AI Recuiter</h2>
<Button onClick={()=>router.replace('/dashboard')} className='flex items-center gap-x-2'>
 <ArrowRight />  Go to Dashboard </Button>
    </div>
  )
}

export default InterviewCompleted
