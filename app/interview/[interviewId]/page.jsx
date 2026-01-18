'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InterviewContext } from '@/context/InterviewContext'
import { supabase } from '@/services/supabase-client'
import { ArrowRight, BookOpenText, Clock, Loader2, User, Mail, AlertCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { ShaderBackground } from '@/components/ui/digital-aurora'

const Interview = () => {
  const { interviewId } = useParams()
  const [interviewData, setInterviewData] = React.useState()
  const [field, setField] = React.useState('')
  const [Useremail, setUserEmail] = React.useState('')
  const { interviewInfo, setInterviewInfo } = useContext(InterviewContext)
  const router = useRouter()
  const [loading, setloading] = useState(false)

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

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
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <ShaderBackground />

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg px-6">
        {/* Logo */}
        <div className="text-center mb-4">
          <img src="/logo.svg" alt="NextHire" className="h-8 mx-auto mb-2 invert opacity-90" />
          <p className="text-white/50 text-xs font-light">AI-Powered Interview Experience</p>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl p-6 shadow-2xl">
          {loading ? (
            <div className="flex flex-col items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-white mb-4" />
              <p className="text-white/50">Loading interview details...</p>
            </div>
          ) : (
            <>
              {/* Interview Details */}
              {interviewData && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                  <h2 className="text-base font-medium capitalize text-center text-white mb-2">
                    {interviewData?.JobPosition}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/70">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      {interviewData?.InterviewDuration}
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/70">
                      <BookOpenText className="w-3.5 h-3.5 text-emerald-400" />
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
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-white/70 mb-1.5">
                    <User className="w-3.5 h-3.5 text-purple-400" />
                    Your Name
                  </label>
                  <Input
                    placeholder="John Doe"
                    className="h-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-1 focus:ring-white/10 rounded-lg text-sm"
                    onChange={(e) => setField(e.target.value)}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-white/70 mb-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    Your Email
                  </label>
                  <Input
                    placeholder="john@example.com"
                    type="email"
                    className={`h-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-1 focus:ring-white/10 rounded-lg text-sm ${Useremail && !isValidEmail(Useremail) ? 'border-red-500/50' : ''}`}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  {Useremail && !isValidEmail(Useremail) && (
                    <p className="text-red-400 text-[10px] mt-1">Please enter a valid email</p>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 mb-4">
                <div className="flex gap-2">
                  <AlertCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-medium text-purple-300 mb-0.5">Before you start</p>
                    <p className="text-white/50">Stable internet • Quiet environment • Microphone access</p>
                  </div>
                </div>
              </div>

              {/* Join Button */}
              <Button
                onClick={JoinInterview}
                disabled={!field?.trim() || !Useremail?.trim() || !isValidEmail(Useremail)}
                className="w-full h-12 bg-white text-black hover:bg-gray-100 border-none transition-all duration-300 rounded-lg font-medium text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join Interview
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </>
          )}
        </div>

        <p className="text-center text-[10px] text-white/30 mt-4 font-light">
          Powered by <span className="text-white/50">NextHire AI</span>
        </p>
      </div>
    </div>
  )
}

export default Interview
