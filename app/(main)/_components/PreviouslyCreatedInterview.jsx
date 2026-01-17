'use client'
import { UseUser } from '@/app/Provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabase-client'
import { Book, ClipboardCopy, Users, Calendar, Briefcase, Clock, ArrowRight, Video } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const PreviouslyCreatedInterview = () => {
  const { user } = UseUser()
  const router = useRouter()
  const [interviews, setInterviews] = React.useState([])
  const [feedback, setfeedback] = useState([])

  useEffect(() => {
    GetInterviewList()
  }, [user])

  const GetInterviewList = async () => {
    let { data: Interviews, err } = await supabase
      .from('Interviews')
      .select('*')
      .eq('UserEmail', user?.email)
      .order('id', { ascending: false })
      .limit(6)

    setInterviews(Interviews || [])

    let { data: Interviewfeedback, error } = await supabase
      .from('Interview-feedback')
      .select('*')
    setfeedback(Interviewfeedback || [])
  }

  const copyurl = async (url) => {
    try {
      const urlLink = `${process.env.NEXT_PUBLIC_URL}/interview/${url}`
      await navigator.clipboard.writeText(urlLink)
      toast.success('Interview link copied!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getTypeColor = (type) => {
    const colors = {
      'Technical': 'bg-[#dbeafe] text-[#1d4ed8]',
      'Behavioral': 'bg-[#ffedd5] text-[#c2410c]',
      'Experience': 'bg-[#f3e8ff] text-[#7c3aed]',
      'Problem Solving': 'bg-[#fee2e2] text-[#dc2626]',
      'Leadership': 'bg-[#d1fae5] text-[#059669]',
    };
    return colors[type] || 'bg-[#f1f5f9] text-[#64748b]';
  };

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-[#0f172a]">Recent Interviews</h2>
          <p className="text-sm text-[#64748b]">Your latest interview sessions</p>
        </div>
        {interviews?.length > 0 && (
          <Link href="/all-interviews">
            <Button variant="ghost" className="text-[#4945d1] hover:bg-[#e8eaf6] gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>

      {interviews?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {interviews.map((interview, index) => {
            const candidateCount = feedback?.filter((item) => item?.interviewId == interview?.InterviewID).length;

            return (
              <div
                key={index}
                className="pro-card p-5 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center text-white font-semibold">
                      {interview?.JobPosition?.[0]?.toUpperCase() || 'J'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0f172a] capitalize line-clamp-1">
                        {interview?.JobPosition}
                      </h3>
                      <p className="text-xs text-[#64748b] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {moment(interview?.createdAt).format('MMM DD, YYYY')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#e2e8f0]">
                  <div className="flex items-center gap-2 text-sm text-[#64748b]">
                    <Clock className="w-4 h-4" />
                    {interview?.InterviewDuration}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-[#059669]" />
                    <span className="text-[#059669] font-medium">{candidateCount}</span>
                    <span className="text-[#64748b]">candidates</span>
                  </div>
                </div>

                {/* Interview Types */}
                {interview?.InterviewType && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {JSON.parse(interview?.InterviewType).slice(0, 3).map((type, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getTypeColor(type)}`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 btn-secondary gap-1.5 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyurl(interview?.InterviewID);
                    }}
                  >
                    <ClipboardCopy className="w-3.5 h-3.5" />
                    Copy Link
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 btn-primary gap-1.5 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`${interview?.InterviewID}/report`);
                    }}
                  >
                    <Book className="w-3.5 h-3.5" />
                    Report
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="pro-card p-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#e8eaf6] flex items-center justify-center mb-4">
            <Video className="w-8 h-8 text-[#4945d1]" />
          </div>
          <h3 className="text-lg font-semibold text-[#0f172a] mb-2">No interviews yet</h3>
          <p className="text-sm text-[#64748b] mb-6 max-w-sm mx-auto">
            Create your first AI-powered interview and start screening candidates.
          </p>
          <Link href="/dashboard/createInterview">
            <Button className="btn-primary gap-2">
              <Video className="w-4 h-4" />
              Create Interview
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default PreviouslyCreatedInterview