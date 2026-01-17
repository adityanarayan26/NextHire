'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InterviewContext } from '@/context/InterviewContext'
import { supabase } from '@/services/supabase-client'
import { ArrowRight, BookOpenText, Clock, Loader2, User, Mail, AlertCircle, Sparkles } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const Interview = () => {
  const { interviewId } = useParams()
  const [interviewData, setInterviewData] = React.useState()
  const [field, setField] = React.useState('')
  const [Useremail, setUserEmail] = React.useState('')
  const { interviewInfo, setInterviewInfo } = useContext(InterviewContext)
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

    setInterviewInfo({
      'Username': field,
      "UserEmail": Useremail,
      'InterviewData': Interviews[0],
    })
    router.push(interviewId + '/start')
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo.svg" alt="NextHire" className="h-10 mx-auto mb-4" />
          <p className="text-[#64748b]">AI-Powered Interview Experience</p>
        </div>

        {/* Main Card */}
        <div className="pro-card p-8">
          {loading ? (
            <div className="flex flex-col items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-[#4945d1] mb-4" />
              <p className="text-[#64748b]">Loading interview details...</p>
            </div>
          ) : (
            <>
              {/* Interview Details */}
              {interviewData && (
                <div className="bg-[#f8fafc] rounded-2xl p-5 mb-6 border border-[#e2e8f0]">
                  <h2 className="text-lg font-semibold capitalize text-center text-[#0f172a] mb-3">
                    {interviewData?.JobPosition}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-3">
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#e2e8f0] text-sm text-[#64748b]">
                      <Clock className="w-4 h-4 text-[#4945d1]" />
                      {interviewData?.InterviewDuration}
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#e2e8f0] text-sm text-[#64748b]">
                      <BookOpenText className="w-4 h-4 text-[#4945d1]" />
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
                    </span>
                  </div>
                </div>
              )}

              {/* Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#0f172a] mb-2">
                    <User className="w-4 h-4 text-[#4945d1]" />
                    Your Name
                  </label>
                  <Input
                    placeholder="e.g. John Doe"
                    className="h-12 bg-white border-[#e2e8f0] focus:border-[#4945d1] focus:ring-2 focus:ring-[#4945d1]/10 rounded-xl"
                    onChange={(e) => setField(e.target.value)}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#0f172a] mb-2">
                    <Mail className="w-4 h-4 text-[#4945d1]" />
                    Your Email
                  </label>
                  <Input
                    placeholder="e.g. john@example.com"
                    type="email"
                    className="h-12 bg-white border-[#e2e8f0] focus:border-[#4945d1] focus:ring-2 focus:ring-[#4945d1]/10 rounded-xl"
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="bg-[#e8eaf6] border border-[#c7d2fe] rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-[#4945d1] flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-[#4945d1] mb-1">Before you start</p>
                    <ul className="text-[#64748b] space-y-1">
                      <li>• Ensure stable internet connection</li>
                      <li>• Find a quiet environment</li>
                      <li>• Allow microphone access</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Join Button */}
              <Button
                onClick={JoinInterview}
                disabled={!field?.trim() || !Useremail?.trim()}
                className="w-full h-14 text-lg font-semibold btn-primary gap-2 rounded-xl"
              >
                Join Interview
                <ArrowRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>

        <p className="text-center text-sm text-[#94a3b8] mt-6">
          Powered by <span className="font-semibold text-[#4945d1]">NextHire AI</span>
        </p>
      </div>
    </div>
  )
}

export default Interview
