'use client'
import React from 'react'
import InterviewHeader from './_components/Header'
import {InterviewContext} from '@/context/InterviewContext'
import { Toaster } from '@/components/ui/sonner'
const Interviewlayout = ({children}) => {
  const [interviewInfo, setInterviewInfo] = React.useState()
  return (
    <InterviewContext.Provider value={{interviewInfo, setInterviewInfo}}>

    <div>
        <InterviewHeader/>
        <Toaster />
      {children}
    </div>
    </InterviewContext.Provider>
  )
}

export default Interviewlayout
