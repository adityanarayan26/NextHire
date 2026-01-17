import React, { useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants/InterviewType'
import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase, FileText, Clock, CheckCircle } from 'lucide-react'

const FormContainer = ({ handleInputChange, GotoNext }) => {
  const [interviewType, setInterviewType] = React.useState([])

  useEffect(() => {
    if (interviewType) {
      handleInputChange("InterviewType", interviewType)
    }
  }, [interviewType])

  const getTypeColor = (type, isSelected) => {
    if (!isSelected) return 'bg-[#f1f5f9] text-[#64748b] border-[#e2e8f0]';
    const colors = {
      'Technical': 'bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]',
      'Behavioral': 'bg-[#ffedd5] text-[#c2410c] border-[#fdba74]',
      'Experience': 'bg-[#f3e8ff] text-[#7c3aed] border-[#c4b5fd]',
      'Problem Solving': 'bg-[#fee2e2] text-[#dc2626] border-[#fca5a5]',
      'Leadership': 'bg-[#d1fae5] text-[#059669] border-[#6ee7b7]',
    };
    return colors[type] || 'bg-[#e8eaf6] text-[#4945d1] border-[#c7d2fe]';
  };

  return (
    <div className="pro-card p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#e2e8f0]">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#0f172a]">Interview Details</h2>
          <p className="text-sm text-[#64748b]">Define the role and requirements</p>
        </div>
      </div>

      {/* Job Position */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-medium text-[#0f172a] mb-2">
          <Briefcase className="w-4 h-4 text-[#4945d1]" />
          Job Position <span className="text-[#ef4444]">*</span>
        </label>
        <Input
          placeholder="e.g. Senior Full Stack Developer"
          className="h-12 bg-white border-[#e2e8f0] focus:border-[#4945d1] focus:ring-2 focus:ring-[#4945d1]/10 rounded-xl"
          onChange={(e) => handleInputChange("JobPosition", e.target.value)}
        />
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-medium text-[#0f172a] mb-2">
          <FileText className="w-4 h-4 text-[#4945d1]" />
          Job Description <span className="text-[#ef4444]">*</span>
        </label>
        <Textarea
          placeholder="Describe the role, responsibilities, required skills, and experience..."
          className="min-h-[120px] bg-white border-[#e2e8f0] focus:border-[#4945d1] focus:ring-2 focus:ring-[#4945d1]/10 rounded-xl resize-none"
          onChange={(e) => handleInputChange("JobDescription", e.target.value)}
        />
      </div>

      {/* Interview Duration */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-medium text-[#0f172a] mb-2">
          <Clock className="w-4 h-4 text-[#4945d1]" />
          Duration <span className="text-[#ef4444]">*</span>
        </label>
        <Select onValueChange={(value) => handleInputChange("InterviewDuration", value)}>
          <SelectTrigger className="h-12 bg-white border-[#e2e8f0] focus:border-[#4945d1] focus:ring-2 focus:ring-[#4945d1]/10 rounded-xl">
            <SelectValue placeholder="Select interview duration" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#e2e8f0] rounded-xl">
            <SelectItem value="5 Min">5 Minutes - Quick Screening</SelectItem>
            <SelectItem value="15 Min">15 Minutes - Standard</SelectItem>
            <SelectItem value="30 Min">30 Minutes - Detailed</SelectItem>
            <SelectItem value="45 Min">45 Minutes - Comprehensive</SelectItem>
            <SelectItem value="60 Min">60 Minutes - In-depth</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div className="mb-8">
        <label className="flex items-center gap-2 text-sm font-medium text-[#0f172a] mb-3">
          Interview Type <span className="text-[#ef4444]">*</span>
          <span className="text-xs text-[#64748b] font-normal">(select one or more)</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {InterviewType.map((type, index) => {
            const isSelected = interviewType.includes(type?.name);
            return (
              <button
                key={index}
                type="button"
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                  border transition-all duration-200
                  ${getTypeColor(type?.name, isSelected)}
                  ${isSelected ? 'shadow-sm' : 'hover:bg-[#f8fafc]'}
                `}
                onClick={() => {
                  setInterviewType(prev =>
                    prev.includes(type?.name)
                      ? prev.filter(t => t !== type?.name)
                      : [...prev, type?.name]
                  );
                }}
              >
                {isSelected && <CheckCircle className="w-4 h-4" />}
                {type?.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-6 border-t border-[#e2e8f0]">
        <Button
          onClick={() => GotoNext()}
          className="btn-primary h-12 px-8 gap-2 rounded-xl text-base font-medium"
        >
          Generate Questions
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}

export default FormContainer
