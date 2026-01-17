'use client'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import FormContainer from '../createInterview/_components/FormContainer'
import React, { useEffect } from 'react'
import QuestionList from './_components/QuestionList'
import { toast } from 'sonner'
import InterviewLink from './_components/InterviewLink'

const page = () => {
    const router = useRouter()
    const [step, setStep] = React.useState(1)
    const [interviewID, setinterviewID] = React.useState()
    const [formData, setFormData] = React.useState({})

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const onGotoNext = () => {
        if (
            !formData?.JobPosition?.trim() ||
            !formData?.JobDescription?.trim() ||
            !formData?.InterviewDuration?.trim() ||
            !formData?.InterviewType?.length
        ) {
            toast.error('Please fill all required fields')
            return;
        }
        setStep(step + 1);
    }

    const onCreateInterview = (id) => {
        setinterviewID(id);
        setStep(step + 1);
    }

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = 'Are you sure you want to leave? Your progress will be lost.';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const steps = [
        { id: 1, title: 'Details', desc: 'Job info' },
        { id: 2, title: 'Questions', desc: 'AI generated' },
        { id: 3, title: 'Share', desc: 'Send link' }
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => router.back()}
                    className="w-10 h-10 rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] flex items-center justify-center transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-[#64748b]" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-[#0f172a]">Create Interview</h1>
                    <p className="text-sm text-[#64748b]">Set up your AI-powered interview</p>
                </div>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-8 px-4">
                {steps.map((s, idx) => (
                    <React.Fragment key={s.id}>
                        <div className="flex items-center gap-3">
                            <div className={`
                                w-10 h-10 rounded-xl flex items-center justify-center font-semibold transition-all
                                ${step > s.id
                                    ? 'gradient-primary text-white'
                                    : step === s.id
                                        ? 'bg-[#4945d1] text-white'
                                        : 'bg-[#f1f5f9] text-[#94a3b8]'
                                }
                            `}>
                                {step > s.id ? <CheckCircle className="w-5 h-5" /> : s.id}
                            </div>
                            <div className="hidden sm:block">
                                <p className={`text-sm font-medium ${step >= s.id ? 'text-[#0f172a]' : 'text-[#94a3b8]'}`}>
                                    {s.title}
                                </p>
                                <p className="text-xs text-[#94a3b8]">{s.desc}</p>
                            </div>
                        </div>
                        {idx < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-4 rounded ${step > s.id ? 'bg-[#4945d1]' : 'bg-[#e2e8f0]'}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Content */}
            <div className="animate-fade-in">
                {step === 1 && (
                    <FormContainer
                        handleInputChange={handleInputChange}
                        GotoNext={() => onGotoNext()}
                    />
                )}
                {step === 2 && (
                    <QuestionList
                        formData={formData}
                        onCreateInterview={(interviewID) => onCreateInterview(interviewID)}
                    />
                )}
                {step === 3 && (
                    <InterviewLink
                        interviewID={interviewID}
                        formData={formData}
                    />
                )}
            </div>
        </div>
    )
}

export default page
