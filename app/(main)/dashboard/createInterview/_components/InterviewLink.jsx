import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { RiWhatsappFill } from '@remixicon/react';
import { ArrowLeft, Book, Clock, Copy, Mail, Plus, Slack, CheckCircle, Share2, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

const InterviewLink = ({ interviewID, formData }) => {
  const url = process.env.NEXT_PUBLIC_URL + '/interview/' + interviewID
  const router = useRouter()

  const CopiedLink = async () => {
    await navigator.clipboard.writeText(url)
    toast.success('Interview link copied!')
  }

  return (
    <div className="space-y-6">
      {/* Success Card */}
      <div className="pro-card p-8 text-center">
        <div className="w-20 h-20 mx-auto rounded-2xl gradient-success flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Interview Created!</h2>
        <p className="text-[#64748b] max-w-md mx-auto">
          Your AI-powered interview is ready. Share the link with candidates to get started.
        </p>
      </div>

      {/* Link Card */}
      <div className="pro-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#4945d1]" />
            <h3 className="font-semibold text-[#0f172a]">Interview Link</h3>
          </div>
          <span className="px-3 py-1 rounded-lg bg-[#fef3c7] text-[#d97706] text-xs font-medium flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Valid 30 days
          </span>
        </div>

        <div className="flex gap-3 mb-5">
          <Input
            defaultValue={url}
            readOnly
            className="h-12 bg-[#f8fafc] border-[#e2e8f0] font-mono text-sm rounded-xl"
          />
          <Button onClick={CopiedLink} className="h-12 px-6 gap-2 btn-primary rounded-xl">
            <Copy className="w-4 h-4" />
            Copy
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f1f5f9] text-sm">
            <Clock className="w-4 h-4 text-[#4945d1]" />
            <span className="text-[#64748b]">{formData?.InterviewDuration}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f1f5f9] text-sm">
            <Book className="w-4 h-4 text-[#4945d1]" />
            <span className="text-[#64748b]">{formData?.QuestionList?.length || 0} Questions</span>
          </div>
        </div>
      </div>

      {/* Share Options */}
      <div className="pro-card p-6">
        <h3 className="font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-[#4945d1]" />
          Quick Share
        </h3>
        <div className="flex justify-center gap-4">
          <a
            href={`mailto:?subject=${encodeURIComponent('Interview Invitation - ' + formData?.JobPosition)}&body=${encodeURIComponent(`You have been invited to an AI-powered interview.\n\nPosition: ${formData?.JobPosition}\nDuration: ${formData?.InterviewDuration}\n\nJoin here: ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#f8fafc] hover:bg-[#f1f5f9] transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#fee2e2] flex items-center justify-center group-hover:bg-[#ef4444] transition-all">
              <Mail className="w-6 h-6 text-[#ef4444] group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-[#64748b]">Email</span>
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Interview Invitation\n\nPosition: ${formData?.JobPosition}\nDuration: ${formData?.InterviewDuration}\n\nJoin: ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#f8fafc] hover:bg-[#f1f5f9] transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#d1fae5] flex items-center justify-center group-hover:bg-[#22c55e] transition-all">
              <RiWhatsappFill className="w-6 h-6 text-[#22c55e] group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-[#64748b]">WhatsApp</span>
          </a>
          <a
            href={`https://slack.com/app_redirect`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#f8fafc] hover:bg-[#f1f5f9] transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f3e8ff] flex items-center justify-center group-hover:bg-[#7c3aed] transition-all">
              <Slack className="w-6 h-6 text-[#7c3aed] group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-[#64748b]">Slack</span>
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <Link href="/dashboard">
          <Button className="h-12 btn-secondary gap-2 rounded-xl">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Button>
        </Link>
        <Link href={'/interview/' + interviewID}>
          <Button className="h-12 btn-primary gap-2 rounded-xl">
            Preview Interview
            <Plus className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default InterviewLink
