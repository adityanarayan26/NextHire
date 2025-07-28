'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InterviewContext } from '@/context/InterviewContext'
import { supabase } from '@/services/supabase-client'
import { ArrowRight, BookOpenTextIcon, Clock, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const Interview = () => {
  const { interviewId } = useParams()
  const [interviewData, setInterviewData] = React.useState()
  const [field, setField] = React.useState('')
  const [Useremail, setUserEmail] = React.useState('')
  const {interviewInfo, setInterviewInfo} = useContext(InterviewContext)
  const router = useRouter()

  const [loading, setloading] = useState(false)



  useEffect(() => {
    if (interviewId) {
      GetInterviewDetail();
    }
  }, [interviewId])


  const GetInterviewDetail = async () => {
    setloading(true)
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select("JobPosition,InterviewDuration,InterviewType")
      .eq('InterviewID', interviewId);

    if (error) {
      console.error('Error fetching interview details:', error);
      setloading(false)
    } else {
      setInterviewData(Interviews[0])

      setloading(false)

    }
  }


  const JoinInterview = async () => {
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select("*")
      .eq('InterviewID', interviewId);


      
setInterviewInfo({'Username': field,
  "UserEmail":Useremail,
'InterviewData': Interviews[0],
})


    router.push(interviewId+'/start')


  }
  return (
    <div className='w-full relative  flex flex-col  items-center justify-center'>
      <div className='absolute top-5 right-5'>

        <Button onClick={JoinInterview} className='my-2 mb-4 cursor-pointer flex items-center gap-x-1 ' disabled={!field?.trim()} >
          Join Interview <ArrowRight size={15} />
        </Button>
      </div>
      <Image src={'/interview.png'} height={350} width={350} alt='interviewimage' />

      {loading ? (
        <div>
          <h1 className='text-lg font-semibold flex items-center gap-x-2'><Loader2 className='animate-spin ' size={15} /> Loading Interview Details...</h1>
        </div>
      ) : (<div className='mt-3 flex flex-col items-center justify-center'>
        <h1 className='capitalize text-lg font-medium mb-2'>{interviewData?.JobPosition}</h1>
        <div className='flex gap-x-4'>
          <h2 className='border p-1 text-sm bg-gray-200  px-2 rounded-xl flex items-center gap-x-1'> <Clock size={15} /> {interviewData?.InterviewDuration}</h2>
          <h2 className='border p-1 text-sm bg-gray-200  px-2 rounded-xl flex items-center gap-x-2'><BookOpenTextIcon size={15} />
            {Array.isArray(interviewData?.InterviewType)
              ? interviewData.InterviewType.join(', ')
              : (() => {
                try {
                  const parsed = JSON.parse(interviewData?.InterviewType || 'null');
                  return Array.isArray(parsed) ? parsed.join(', ') : parsed;
                } catch {
                  return interviewData?.InterviewType;
                }
              })()}
          </h2>
        </div>
      </div>)}
      <div className='mt-3 w-1/2 pt-3  rounded-2xl'>
        <label htmlFor="">Enter your name</label>
        <Input placeholder='e.g. John Doe' onChange={(e) => setField(e.target.value)} />
      </div>
      <div className='my-3 w-1/2 pb-3 rounded-2xl'>
        <label htmlFor="">Enter your email</label>
        <Input placeholder='e.g. Johndoe@gmail.com' onChange={(e) => setUserEmail(e.target.value)} />
      </div>
      <div className='p-3 mt-1 mb-5 w-1/2 rounded-2xl   bg-primary/20 text-primary/60 '>
        <h1>Information</h1>
        <p className='text-sm text-gray-500'>You will be asked a series
          of questions related to the job position you applied for. Please answer them to the best of your ability.</p>
        <p className='text-sm text-gray-500'>Please ensure you have a stable
          internet connection and a quiet environment to take the interview.</p>


      </div>

    </div>
  )
}

export default Interview
