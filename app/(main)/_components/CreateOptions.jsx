import { ArrowRight, Video, Zap, Clock, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CreateOptions = () => {
    return (
        <div>
            <Link href={'/dashboard/createInterview'}>
                <div className="pro-card p-6 hover-lift cursor-pointer group">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-medium">
                                <Video className="w-6 h-6 text-white" />
                            </div>

                            {/* Content */}
                            <div>
                                <h2 className="text-lg font-semibold text-[#0f172a] group-hover:text-[#4945d1] transition-colors">
                                    Create New Interview
                                </h2>
                                <p className="text-sm text-[#64748b] mt-0.5">
                                    Set up AI-powered interviews in minutes
                                </p>
                            </div>
                        </div>

                        {/* Arrow */}
                        <div className="w-10 h-10 rounded-xl bg-[#f1f5f9] flex items-center justify-center group-hover:bg-[#4945d1] transition-all">
                            <ArrowRight className="w-5 h-5 text-[#64748b] group-hover:text-white transition-colors" />
                        </div>
                    </div>

                    {/* Feature Pills */}
                    <div className="flex gap-3 mt-5 pt-5 border-t border-[#e2e8f0]">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#e8eaf6] text-[#4945d1] text-xs font-medium">
                            <Zap className="w-3.5 h-3.5" />
                            AI-Powered
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#d1fae5] text-[#059669] text-xs font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            5-60 min
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#e0f2fe] text-[#0284c7] text-xs font-medium">
                            <MessageSquare className="w-3.5 h-3.5" />
                            Auto Feedback
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CreateOptions
