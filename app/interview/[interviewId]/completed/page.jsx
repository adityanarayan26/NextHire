'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'
import { ShaderBackground } from '@/components/ui/digital-aurora'

const InterviewCompleted = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.refresh()
      toast.success('Interview completed! Check feedback in dashboard.')
    }, 300);
  }, [])

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <ShaderBackground />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md p-6 text-center">
        {/* Premium Success Animation */}
        <div className="relative inline-flex mb-12">
          {/* Outer glow ring */}
          <div className="absolute inset-0 w-32 h-32 -m-2 rounded-[2rem] bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 blur-xl animate-pulse" />

          {/* Main icon container */}
          <div className="relative w-32 h-32 rounded-[2rem] bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 flex items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.5)] animate-[scaleIn_0.5s_ease-out]">
            {/* Inner shine */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/20 via-transparent to-transparent" />

            {/* Check icon with draw animation */}
            <svg className="w-16 h-16 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" className="animate-[drawCheck_0.6s_ease-out_0.3s_both]" style={{ strokeDasharray: 30, strokeDashoffset: 30 }} />
            </svg>
          </div>

          {/* Floating sparkle badge */}
          

          {/* Particle effects */}
          <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-emerald-400 animate-[ping_2s_ease-in-out_infinite]" />
          <div className="absolute top-4 -left-4 w-2 h-2 rounded-full bg-cyan-400 animate-[ping_2.5s_ease-in-out_infinite_0.5s]" />
          <div className="absolute -bottom-4 right-4 w-2 h-2 rounded-full bg-amber-400 animate-[ping_2s_ease-in-out_infinite_1s]" />
        </div>

        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl p-8 shadow-2xl mb-8">
          <h1 className="text-3xl font-light tracking-tight text-white mb-3">
            Interview Completed!
          </h1>
          <p className="text-white/50 text-sm font-light mb-10">
            Thank you for your time. Your responses have been analyzed by our AI.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10">
              <div className="text-2xl font-light text-emerald-400 mb-1">✓</div>
              <p className="text-xs text-white/50 font-light">All Questions</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10">
              <div className="text-2xl font-light text-purple-400 mb-1">AI</div>
              <p className="text-xs text-white/50 font-light">Feedback Ready</p>
            </div>
          </div>

          <Button
            onClick={() => router.replace('/dashboard')}
            className="w-full h-14 bg-white text-black hover:bg-gray-100 border-none transition-all duration-300 rounded-xl font-medium text-base shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <p className="text-xs text-white/30 font-light">
          Powered by <span className="text-white/50">NextHire AI</span>
        </p>
      </div>
    </div>
  )
}

export default InterviewCompleted
