import { UseUser } from '@/app/Provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabase-client'
import axios from 'axios'
import { Loader2, MessageSquare, ArrowRight, Sparkles } from 'lucide-react'
import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const QuestionList = ({ formData, onCreateInterview }) => {
  const [loading, setLoading] = React.useState(false)
  const [questionsList, setQuestionsList] = React.useState([])
  const { user } = UseUser()
  const hasFetchedRef = React.useRef(false);
  const [saveLoading, setSaveLoading] = React.useState(false);

  useEffect(() => {
    if (formData && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      GenerateQuestionList();
    }
  }, [formData])

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/ai-model', { ...formData })
      if (response.data.success) {
        setQuestionsList(response.data.questions);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error generating questions:", error);
      setLoading(false);
    }
  }

  const onFinish = async () => {
    setSaveLoading(true);
    const interviewID = uuidv4()
    await supabase
      .from('Interviews')
      .insert([{
        ...formData,
        QuestionList: questionsList,
        UserEmail: user?.email,
        InterviewID: interviewID
      }])
      .select()
    setSaveLoading(false);
    onCreateInterview(interviewID)
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
      {/* Loading State */}
      {loading && (
        <div className="pro-card p-12 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6 animate-pulse">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[#0f172a] mb-2">Generating Questions</h3>
          <p className="text-[#64748b] mb-4">
            Our AI is crafting personalized questions for this role...
          </p>
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-[#4945d1] animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Questions List */}
      {questionsList?.length > 0 && (
        <div className="pro-card p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#e2e8f0]">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[#0f172a] flex items-center gap-2">
                Generated Questions
                <span className="px-2 py-0.5 rounded-lg bg-[#e8eaf6] text-[#4945d1] text-xs font-medium">
                  {questionsList.length} total
                </span>
              </h2>
              <p className="text-sm text-[#64748b]">Review the AI-generated questions</p>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-8">
            {questionsList?.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#cbd5e1] transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#4945d1] flex items-center justify-center flex-shrink-0 text-white text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#0f172a] leading-relaxed mb-2">
                      {item?.question}
                    </p>
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${getTypeColor(item?.type)}`}>
                      {item?.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action */}
          <div className="flex justify-end pt-6 border-t border-[#e2e8f0]">
            <Button
              onClick={() => onFinish()}
              className="btn-primary h-12 px-8 gap-2 rounded-xl text-base font-medium"
              disabled={saveLoading}
            >
              {saveLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              {saveLoading ? 'Creating...' : 'Create Interview'}
              {!saveLoading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionList
