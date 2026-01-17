'use client'
import React, { useContext, useEffect, useState } from 'react'
import { UseUser } from '@/app/Provider'
import { supabase } from '@/services/supabase-client'
import { ArrowLeft, Loader2, Search, Filter, Users, Calendar, Clock, Briefcase, ArrowUpDown, ChevronDown, ClipboardCopy, Book, Video } from 'lucide-react'
import moment from 'moment'
import { FeedbackContext } from '@/context/FeedbackContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const InterviewList = () => {
  const { user } = UseUser()
  const router = useRouter()
  const [interviews, setInterviews] = useState([])
  const [feedback, setFeedback] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')
  const { setFeedbackCredentials } = useContext(FeedbackContext)

  useEffect(() => {
    user && GetInterviewList()
  }, [user])

  const GetInterviewList = async () => {
    setIsLoading(true)
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('UserEmail', user?.email)
      .order('id', { ascending: false })
    setInterviews(Interviews || [])

    let { data: Interviewfeedback, err } = await supabase
      .from('Interview-feedback')
      .select('*')
    setFeedback(Interviewfeedback || [])
    setIsLoading(false)
  }

  const copyUrl = async (url) => {
    try {
      const urlLink = `${process.env.NEXT_PUBLIC_URL}/interview/${url}`
      await navigator.clipboard.writeText(urlLink)
      toast.success('Interview link copied!')
    } catch (err) {
      console.error('Failed to copy:', err)
      toast.error('Failed to copy link')
    }
  }

  const getTypeColor = (type) => {
    const colors = {
      'Technical': 'bg-blue-100 text-blue-700 border-blue-200',
      'Behavioral': 'bg-orange-100 text-orange-700 border-orange-200',
      'Experience': 'bg-purple-100 text-purple-700 border-purple-200',
      'Problem Solving': 'bg-red-100 text-red-700 border-red-200',
      'Leadership': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    }
    return colors[type] || 'bg-gray-100 text-gray-600 border-gray-200'
  }

  const filteredInterviews = interviews
    .filter(interview =>
      interview?.JobPosition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview?.JobDescription?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt)
      }
    })

  const totalCandidates = feedback?.length || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">All Interviews</h1>
              <p className="text-slate-500 mt-1">Manage and track all your interview sessions</p>
            </div>

            {/* Stats Summary */}
            <div className="flex gap-4">
              <div className="bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Video className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{interviews.length}</p>
                    <p className="text-xs text-slate-500">Total Interviews</p>
                  </div>
                </div>
              </div>
              <div className="bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{totalCandidates}</p>
                    <p className="text-xs text-slate-500">Total Candidates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by position or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-700 placeholder:text-slate-400"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-slate-500">Loading interviews...</p>
          </div>
        ) : filteredInterviews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredInterviews.map((interview, index) => {
              const candidateCount = feedback?.filter(
                (item) => item?.interviewId === interview?.InterviewID
              ).length

              return (
                <div
                  key={interview?.InterviewID || index}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden group"
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-slate-100">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
                          {interview?.JobPosition?.[0]?.toUpperCase() || 'J'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg capitalize line-clamp-1 group-hover:text-primary transition-colors">
                            {interview?.JobPosition}
                          </h3>
                          <p className="text-sm text-slate-500 line-clamp-1 max-w-[250px]">
                            {interview?.JobDescription}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-semibold">{candidateCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{moment(interview?.createdAt).format('MMM DD, YYYY')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{interview?.InterviewDuration}</span>
                      </div>
                    </div>

                    {/* Interview Types */}
                    {interview?.InterviewType && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {JSON.parse(interview?.InterviewType).map((type, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(type)}`}
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2 text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50"
                        onClick={(e) => {
                          e.stopPropagation()
                          copyUrl(interview?.InterviewID)
                        }}
                      >
                        <ClipboardCopy className="w-4 h-4" />
                        Copy Link
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/${interview?.InterviewID}/report`)
                        }}
                      >
                        <Book className="w-4 h-4" />
                        View Report
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
              <Video className="w-10 h-10 text-slate-400" />
            </div>
            {searchQuery ? (
              <>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No results found</h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  No interviews match your search for "{searchQuery}". Try a different search term.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                  className="gap-2"
                >
                  Clear Search
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No interviews yet</h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  Create your first AI-powered interview and start screening candidates efficiently.
                </p>
                <Link href="/dashboard/createInterview">
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Video className="w-4 h-4" />
                    Create Interview
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewList