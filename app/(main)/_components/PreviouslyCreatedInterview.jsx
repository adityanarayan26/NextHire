'use client'
import { UseUser } from '@/app/Provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabase-client'
import { Video } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import moment from 'moment'
import { toast } from 'sonner'

const PreviouslyCreatedInterview = () => {
  const { user } = UseUser()
  const [interviews, setInterviews] = React.useState([])

  useEffect(() => {
    GetInterviewList()
  }, [user])

  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('UserEmail', user?.email)
      .order('id', { ascending: false })
      .limit(4)
    setInterviews(Interviews || [])
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
              className="relative flex flex-col  gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 shadow hover:bg-gray-100 transition duration-300 cursor-pointer"
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
              <div className="flex-1 min-w-0">
                <div className="mb-1">
                  <p className="text-sm font-semibold text-gray-700">
                    Job Position:
                    <span className="text-xs font-medium text-gray-600 ml-1">
                      {interview?.JobPosition}
                    </span>
                  </p>
                </div>
                <div className="mb-1">
                  <p className="text-sm font-semibold text-gray-700">
                    Job Description:
                    <span className="text-xs font-medium text-gray-600 ml-1">
                      {interview?.JobDescription}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Interview Duration:
                    <span className="text-xs font-medium text-gray-800 ml-1">
                      {interview?.InterviewDuration}
                    </span>
                  </p>
                </div>
              </div>


              {/* Copy Button */}
              <div className="flex flex-col items-end gap-y-2">
                <Button size='sm' onClick={() => copyurl(interview?.InterviewID)}>
                  Copy link
                </Button>
                <span className=" bg-primary/20 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                {moment(interview?.createdAt).format('DD/MM/yyyy')}
              </span>
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