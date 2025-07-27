'use client'
import { ArrowLeft } from 'lucide-react'
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
const[interviewID,setinterviewID]= React.useState()
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
            toast('Please fill all the fields')
            return;
        }
        console.log("Form is valid. Advancing step...");
        setStep(step + 1);
    }
const onCreateInterview = (id) => {
    setinterviewID(id);
    setStep(step + 1);
}
 useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = 'Are you sure you want to reload? All the content will be reset.';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    return (
        <div>
            <div className='flex gap-x-2 items-center mt-5'>
                <ArrowLeft className='size-6' onClick={() => router.back()} />
                <h1 className='text-xl font-semibold'>
                    Create New Interview
                </h1>
            </div>
            <Progress value={step * 33.33} className='my-5' />
            {step == 1 ? <FormContainer handleInputChange={handleInputChange} GotoNext={() => onGotoNext()} /> : step == 2 ? <QuestionList formData={formData} onCreateInterview={(interviewID)=>onCreateInterview(interviewID)} /> : step == 3 ? <InterviewLink interviewID={interviewID} formData={formData} />  : null }
        </div>
    )
}

export default page
