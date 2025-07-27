import { UseUser } from '@/app/Provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabase-client'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
const QuestionList = ({ formData,onCreateInterview }) => {
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
      const response = await axios.post('/api/ai-model', {
        ...formData
      })
      console.log("Generated Questions:", response.data.questions);
      if (response.data.success) {
        setQuestionsList(response.data.questions);
      } else {
        console.error("Error generating questions:", response.data.error);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error generating questions:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }

  }

  const onFinish = async () => {
    setSaveLoading(true);
    const interviewID = uuidv4()
    const { data, error } = await supabase
      .from('Interviews')
      .insert([
        {
          ...formData,
          QuestionList: questionsList,
          UserEmail: user?.email,
          InterviewID: interviewID
        },
      ])
      .select()
      setSaveLoading(false);
    console.log(data);
onCreateInterview(interviewID)
  }

  return (
    <div>
      {loading &&
        (<div className='flex justify-center items-center h-64'>
          <p className='text-lg animate-pulse font-semibold'>Generating Questions...</p>
        </div>)
      }
      {questionsList?.length > 0 && (
        <div>
          <h2 className='text-lg font-semibold mb-4'>Generated Questions</h2>
          <ul className='space-y-3'>
            {questionsList?.map((item, index) => (
              <li key={index} className='p-4 border rounded-md shadow-sm'>
                <p className='font-medium'>{item?.question}</p>
                <span className='text-sm text-gray-500'>Type: {item?.type}</span>
              </li>
            ))}
          </ul>

        </div>
      )}
      {questionsList?.length > 0 && <div className='w-full flex justify-end items-end mt-5'>
        <Button onClick={() => onFinish()} className='flex items-center gap-x-2'>
          {saveLoading && <Loader2 className='animate-spin'/>}
          Create Interview Link & Finish
        </Button>
      </div>}
    </div>
  )
}

export default QuestionList
