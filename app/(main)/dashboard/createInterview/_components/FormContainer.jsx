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
import {InterviewType} from '@/services/Constants/InterviewType'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'


const FormContainer = ({handleInputChange,GotoNext}) => {
const [interviewType, setInterviewType] = React.useState([])

useEffect(()=>{
if(interviewType) {
    handleInputChange("InterviewType", interviewType)
}
},[interviewType])

  return (
    <div className='bg-white p-5 rounded-lg '>
<div>
    <h2 className='text-sm font-medium'>Job Position</h2>
    <Input placeholder='eg. Full Stack Developer' onChange={(e)=>handleInputChange("JobPosition",e.target.value)}/>
</div>
<div className='mt-3'>
    <h2 className='text-sm pt-3 font-medium'>Job Description</h2>
  <Textarea placeholder='Enter Details Job Description' className='h-[100px]' onChange={(e)=>handleInputChange("JobDescription",e.target.value)}/>
</div>
<div className='mt-3 '>
    <h2 className='text-sm pt-3 font-medium'>Interview Duration</h2>
    <Select className='w-full' onValueChange={(value)=>handleInputChange("InterviewDuration", value)}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select Duration" />
  </SelectTrigger>
  <SelectContent className='mt-3'>
    <SelectItem value="5 Min">5 Min</SelectItem>
    <SelectItem value="15 Min">15 Min</SelectItem>
    <SelectItem value="30 Min">30 Min</SelectItem>
    <SelectItem value="45 Min">45 Min</SelectItem>
    <SelectItem value="60 Min">60 Min</SelectItem>
  </SelectContent>
</Select>
</div>
<div className='mt-3'>
    <h2 className='text-sm pt-3 font-medium'>Interview Type</h2>
 <div className='flex gap-3 flex-wrap'>
    {InterviewType.map((type, index) => (
        <div
          key={index}
          className={`flex items-center cursor-pointer hover:bg-primary/70 gap-3 p-1 px-2 rounded-2xl bg-primary/80 border select-none ${interviewType.includes(type?.name) ? 'text-white ' : ''}`}
          onClick={() => {
            setInterviewType(prev =>
              prev.includes(type?.name)
                ? prev.filter(t => t !== type?.name)
                : [...prev, type?.name]
            );
          }}
        >
          <span >{type?.name}</span>
        </div>
    ))}
 </div>
</div>
<div className='w-full text-right mt-10 mb-2 cursor-pointer'>

<Button onClick={()=>GotoNext()}>
    Generate Question
    <ArrowRight/>
</Button>
</div>
    </div>
  )
}

export default FormContainer
