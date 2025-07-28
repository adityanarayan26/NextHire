'use client'
import React, { useContext, useEffect, useState } from 'react'
import { UseUser } from '@/app/Provider'
import { supabase } from '@/services/supabase-client'
import { ArrowLeft, Loader2 } from 'lucide-react'
import moment from 'moment'
import { FeedbackContext } from '@/context/FeedbackContext'
import { useRouter } from 'next/navigation'
import { BsPersonSquare } from 'react-icons/bs'
import { RiPagesLine } from 'react-icons/ri'
import { BiTimer } from 'react-icons/bi'

const InterviewList = () => {
  const { user } = UseUser()
  const router = useRouter()
  const [interviews, setInterviews] = React.useState([])
  const { setFeedbackCredentials } = useContext(FeedbackContext)
const[feedback,setfeedback]=useState()
  useEffect(() => {
    user && GetInterviewList()
  }, [user])

  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('UserEmail', user?.email)
    setInterviews(Interviews || [])


let { data: Interviewfeedback, err } = await supabase
  .from('Interview-feedback')
  .select('*')
console.log('Interviewfeedback',Interviewfeedback)
setfeedback(Interviewfeedback || [])


          
  }

  return (
    <div className="bg-secondary px-4 md:px-14 py-10">
      <h1 className="text-2xl md:text-3xl mb-6 font-semibold text-gray-800 text-center md:text-left">
        All Interview List
      </h1>
<h2 onClick={()=>router.back()} className='flex items-center gap-x-1 text-md my-3 cursor-pointer '><ArrowLeft size={16}/> Back</h2>
      {interviews.length > 0 ? (
        <div className="grid relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {interviews.map((interview, index) => (
            <div
              key={index}
              onClick={() => {
                router.replace('/feedback')
                setFeedbackCredentials(interview?.InterviewID)
              }}
              className="group bg-white rounded-xl border border-gray-200 shadow hover:shadow-lg transition duration-300 cursor-pointer p-6"
            >
              <div className="flex  flex-col gap-4">
                {/* Avatar + Name */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                    {user?.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-base">{user?.name}</p>

                  </div>
                </div>

                {/* Job Info */}
                <div className="flex flex-col sm:flex-row gap-6 w-full">
                  <div>
                    <p className="text-gray-500 text-sm font-medium flex items-center
                     gap-x-1"><BsPersonSquare size={16}/> Position</p>
                    <p className="text-primary text-sm capitalize ">{interview?.JobPosition}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium flex items-center
                     gap-x-1"><RiPagesLine size={20}/>Description</p>
                    <p className="text-primary text-sm truncate max-w-xs  capitalize ">{interview?.JobDescription}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium flex items-center
                     gap-x-1"><BiTimer size={23}/>Duration</p>
                    <p className="text-primary text-sm capitalize ">{interview?.InterviewDuration} min</p>
                  </div>
                </div>
<div className='absolute bottom-5 left-5'>
  <h1 className='text-emerald-500 text-xs'>Candidates : {feedback?.filter((item)=>item?.interviewId == interview?.InterviewID
  ).length}</h1>
</div>
                {/* Tags & Date */}
                <div className="flex flex-col items-end justify-between gap-2 w-full sm:w-auto">
                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                    {interview?.InterviewType?.length > 0 ? (
                      JSON.parse(interview?.InterviewType).map((type, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm text-white ${
                            type === 'Technical'
                              ? 'bg-blue-500'
                              : type === 'Experience'
                              ? 'bg-purple-500'
                              : type === 'Behavioral'
                              ? 'bg-orange-500'
                              : type === 'Problem Solving'
                              ? 'bg-red-500'
                              : type === 'Leadership'
                              ? 'bg-green-600'
                              : 'bg-gray-400'
                          }`}
                        >
                          {type}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">Not Specified</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {moment(interview?.createdAt).format('DD MMM, YYYY')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[60vh] flex justify-center items-center">
          <Loader2 className="animate-spin size-10 text-black" />
        </div>
      )}
    </div>
  )
}

export default InterviewList