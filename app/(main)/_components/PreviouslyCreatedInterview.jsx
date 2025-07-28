'use client'
import { RiPagesLine } from "react-icons/ri";
import { BsPersonSquare } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";

import { UseUser } from '@/app/Provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabase-client'
import { Book, ClipboardCopyIcon, SearchCodeIcon, Video } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const PreviouslyCreatedInterview = () => {
  const { user } = UseUser()
  const router = useRouter()
  const [interviews, setInterviews] = React.useState([])
const[feedback,setfeedback]=useState([])
  useEffect(() => {
    GetInterviewList()
  }, [user])

  const GetInterviewList = async () => {
    //interview list
    let { data: Interviews, err } = await supabase
      .from('Interviews')
      .select('*')
      .eq('UserEmail', user?.email)
      .order('id', { ascending: false })
      .limit(4)
      console.log('Interviews',Interviews);
      
    setInterviews(Interviews || [])

    // feedback list 

let { data: Interviewfeedback, error } = await supabase
  .from('Interview-feedback')
  .select('*')
  console.log('Interviewfeedback',Interviewfeedback);
  setfeedback(Interviewfeedback || [])

          
  }

  const copyurl = async (url) => {
    try {
      const urlLink = `${process.env.NEXT_PUBLIC_URL}/interview/${url}`
      await navigator.clipboard.writeText(urlLink)
      toast('Copied URL to clipboard!', {
        description: 'You can now share this link with others.',
        duration: 2000,
      })
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h1 className="font-semibold text-xl text-gray-800 mb-4">
        Previously Created Interviews
      </h1>

      {interviews?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {interviews.map((interview, index) => (
            <div
              key={index}
              
              className="relative flex flex-col  gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 shadow hover:bg-gray-100 transition  duration-300 cursor-pointer"
            >
              {/* Date Pill */}
              

              {/* Avatar Section */}
              <div className="flex  items-center gap-x-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-lg font-semibold">
                  {user?.name[0]}
                </div>
                <span className="mt-1 text-sm font-medium text-gray-800 truncate">
                  {user?.name}
                </span>
              </div>



              {/* Interview Details */}
              <div className="flex items-start  justify-center flex-col min-w-0">
                <div className="mb-1">
                  <p className="text-sm flex gap-x-1 justify-between items-center font-semibold text-gray-700">

<div><BsPersonSquare size={16}/></div>
 Job Position:
                    <span className="text-sm text-blue-500 capitalize font-medium  ml-1">
                      {interview?.JobPosition}
                    </span>
                  </p>
                </div>
                <div className="mb-1">
                  <p className="text-sm flex gap-x-1 justify-between items-center font-semibold text-gray-700">
                <div><RiPagesLine size={20}/></div>  
  Job Description:
                    <span className="text-sm text-blue-500 capitalize font-medium  ml-1">
                      {interview?.JobDescription}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm flex gap-x-1 justify-between items-center font-semibold text-gray-700">
             <div><BiTimer size={23}/></div>     
  Interview Duration:
                    <span className="text-sm text-blue-500 capitalize font-medium  ml-1">
                      {interview?.InterviewDuration}
                    </span>
                  </p>
                </div>
              </div>


              {/* Copy Button */}
              
              <div className="flex  justify-between items-center gap-y-2">
              <div className='size-full flex items-end'>
                <h1 className='text-sm font-medium text-emerald-500'>Candidates {feedback?.filter((item)=>item?.interviewId == interview?.InterviewID).length}</h1>
              </div>
              <div className='flex flex-col items-end gap-2'>
                <Button size='xs' className='px-2 flex items-center gap-x-1 py-1 capitalize' onClick={() => copyurl(interview?.InterviewID)}>
                  <ClipboardCopyIcon size={20}/> Copy link
                </Button>
                <Button size='xs' className='px-2 flex items-center gap-x-1 py-1 bg-emerald-500 text-white capitalize' onClick={()=>router.replace(`${interview?.InterviewID}/report`)}>
                <Book size={20}/>  view report
                </Button>
                <span className="text-xs text-gray-500">
                {moment(interview?.createdAt).format('DD MMM yyyy')}
              </span>
              </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300 mt-6 text-center">
          <Video className="w-12 h-12 text-gray-500 bg-gray-200 p-3 rounded-lg" />
          <h2 className="text-gray-500 font-semibold text-sm">No interviews created yet</h2>
          <Link href="/dashboard/createInterview">
            <Button>Create new interviews +</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default PreviouslyCreatedInterview