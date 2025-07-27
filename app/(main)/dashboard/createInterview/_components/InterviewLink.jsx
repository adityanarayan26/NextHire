import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { supabase } from '@/services/supabase-client';
import { RiWhatsappFill } from '@remixicon/react';
import { ArrowLeft, Book, Clock, Copy, Mail, Plus, Slack, Timer } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

const InterviewLink = ({interviewID,formData}) => {
  const url = process.env.NEXT_PUBLIC_URL+'/interview/'+interviewID



          
const GenerateLink = ()=>{
  return url
}
const CopiedLink=async()=>{
  await navigator.clipboard.writeText(url)
  toast('Link copied to clipboard!')
}
  return (
    <div className=''>
      <div className=' flex justify-center flex-col items-center'>
<svg width="133px" height="133px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L12.0243 14.3899C11.4586 14.9556 10.5414 14.9556 9.97568 14.3899L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.68342 10.9024 9.31658 10.9024 9.70711 11.2929L11 12.5858L14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289Z" fill="#26c939"></path> </g></svg>
<h2 className='font-medium capitalize pt-4 text-lg'>Your AI Interview Is ready!</h2>
<h3 className='capitalize '>Share this link with your candidates to start the interview process</h3>
      </div>
      <div className='bg-white p-5 rounded-2xl mt-5'>
        <div className='flex justify-between pb-3'>

<h1 className='font-medium text-lg'>Interview Link</h1>
<Button className='text-primary/50 text-xs rounded-2xl bg-primary/30 px-2 py-1 hover:bg-primary/30 hover:text-primary/50' size='xs'>
Valid for 30days
</Button>
        </div>
<div className='flex justify-between items-center gap-x-2'>

<Input defaultValue={GenerateLink()} disabled={true} />

<Button onClick={CopiedLink}>
  <Copy/>
  Copy Link
</Button>

</div>
<div className='flex gap-x-2 mt-5'>
  <h2 className='px-2 py-1 bg-gray-200 text-black/60 text-sm rounded-2xl flex gap-x-1 items-center'><Clock size={20}/> {formData?.InterviewDuration} </h2>
  <h2 className='px-2 py-1 bg-gray-200 text-black/60 text-sm rounded-2xl flex gap-x-1 items-center'><Book size={20}/> {formData?.QuestionList?.length} Questions</h2>
  <h2 className='px-2 py-1 bg-gray-200 text-black/60 text-sm rounded-2xl flex gap-x-1 items-center'><Timer size={20}/> Expires on  </h2>
</div>
      </div>

      
      <div className="bg-white rounded-2xl p-5 mt-5">
        <h1 className="text-lg">Share via</h1>
        <div className="flex gap-x-5 mt-3 justify-center">
          <a
            href={`mailto:?subject=${encodeURIComponent('Interview Invitation')}&body=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 text-black/60 px-2 py-1 text-sm rounded-2xl flex gap-x-1 items-center"
          >
            <Mail size={20} /> Email
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Join the interview: ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 text-black/60 px-2 py-1 text-sm rounded-2xl flex gap-x-1 items-center"
          >
            <RiWhatsappFill size={20} /> WhatsApp
          </a>
          <a
            href={`https://slack.com/app_redirect`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 text-black/60 px-2 py-1 text-sm rounded-2xl flex gap-x-1 items-center"
          >
            <Slack size={20} /> Slack
          </a>
        </div>
      </div>
<div className='mt-7 flex items-center justify-between'> 
  <Link href={'/dashboard'}><Button ><ArrowLeft size={20}/> Back to Dashboard</Button></Link>
 <Link href={'/interview/'+interviewID} className='flex items-center gap-x-2'>
<Button><Plus size={20}/> Create Interview</Button> </Link> 
</div>
    </div>
  )
}

export default InterviewLink
