'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, PartyPopper } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const InterviewCompleted = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.refresh()
      toast.success('Interview completed! Check feedback in dashboard.')
    }, 300);
  }, [])

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        {/* Success Icon */}
        <div className="relative inline-flex mb-8">
          <div className="w-28 h-28 rounded-3xl gradient-success flex items-center justify-center shadow-large">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 rounded-xl bg-[#f59e0b] flex items-center justify-center shadow-lg animate-bounce">
            <PartyPopper className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Card */}
        <div className="pro-card p-8 mb-6">
          <h1 className="text-2xl font-bold text-[#0f172a] mb-2">Interview Completed!</h1>
          <p className="text-[#64748b] mb-8">
            Thank you for your time. Your responses have been analyzed by our AI.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="text-2xl font-bold text-[#4945d1] mb-1">✓</div>
              <p className="text-xs text-[#64748b]">All Questions</p>
            </div>
            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="text-2xl font-bold text-[#059669] mb-1">AI</div>
              <p className="text-xs text-[#64748b]">Feedback Ready</p>
            </div>
          </div>

          <Button
            onClick={() => router.replace('/dashboard')}
            className="w-full h-12 text-base font-semibold btn-primary gap-2 rounded-xl"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-sm text-[#94a3b8]">
          Powered by <span className="font-semibold text-[#4945d1]">NextHire AI</span>
        </p>
      </div>
    </div>
  )
}

export default InterviewCompleted
