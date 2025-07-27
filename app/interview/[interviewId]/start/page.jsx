'use client'
import { InterviewContext } from '@/context/InterviewContext'
import { Dice1, Loader2, Mic, Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Vapi from '@vapi-ai/web'
import { supabase } from '../../../../services/supabase-client'
import AlertComponent from '../../_components/AlertComponent'
import { toast } from 'sonner'
import axios from 'axios'
import TimerComponent from '../../_components/TimerComponent'
import { useParams, useRouter } from 'next/navigation'
const startInterview = () => {
    const { interviewInfo, setInterviewInfo } = useContext(InterviewContext)
    const [Conversation, setConversation] = useState('hey nodejs is good language its basically used for backend technology')
    const [activeSpeaker, setActiveSpeaker] = useState(null)
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_AI)
    const [loading, setloading] = useState(false)
    const router = useRouter();
    const { interviewId: InterviewID } = useParams()
    useEffect(() => {
        if (interviewInfo && interviewInfo?.InterviewData?.InterviewDuration) {
            startCall();
        }
    }, [interviewInfo]);

    useEffect(() => {
        vapi.on("call-start", () => {
            console.log('call has started..');
            toast('Call Connected...');
        });
        vapi.on("speech-start", () => {
            console.log('Assistant speech has started..');
            setActiveSpeaker('ai');
        });
        vapi.on("speech-end", () => {
            console.log('Assistant speech has ended..');
            setActiveSpeaker('user');
        });
        vapi.on("call-end", () => {
            console.log('Call has ended..');
            toast('Interview Ended');

        });

        // New handler for message event
        const handleMessage = (message) => {
            console.log("Message:", message);
            if (message?.conversation) {
                const convoString = JSON.stringify(message?.conversation);
                console.log("Conversation string:", convoString);
                setConversation(convoString);
            }
        };

        vapi.on("message", handleMessage);

        // Clean up all listeners
        return () => {
            vapi.off("call-start", () => console.log('ended')
            );
            vapi.off("call-end", () => console.log('ended')
            );
            vapi.off("speech-start", () => console.log('ended')
            );
            vapi.off("speech-end", () => console.log('ended')
            );
            vapi.off("message", handleMessage);
        };
    }, []);


    const StopInterviewMethod = () => {
        vapi.stop();
        GenerateFeedback();

        toast('Interview Stopping...');
        setTimeout(() => {
            toast('Redirecting...')
        }, 100);
    };
    const startCall = () => {
        const questionList = interviewInfo?.InterviewData?.QuestionList
            ?.map(item => item?.question)
            .join(', ');
        console.log(questionList);
        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: `Hi ${interviewInfo?.Username}, how are you? Ready for your interview on ${interviewInfo?.InterviewData?.JobPosition}?`,
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "Jennifer", // female voice
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${interviewInfo?.InterviewData?.JobPosition} interview. Let’s get started with a few questions!"

Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below are the questions ask one by one:
Questions: ${questionList}

If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer. Example:
"Nice! That’s a solid answer."
"Hmm, not quite! Want to try again?"

Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"

After 5–7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:
✅ Be friendly, engaging, and witty 🧠
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate’s confidence level
✅ Ensure the interview remains focused on React
        `.trim(),
                    },
                ],
            },
        };
        vapi.start(assistantOptions)
    }

    const GenerateFeedback = async () => {
        try {
            setloading(true)
            const response = await axios.post('/api/ai-feedback', {
                conversation: Conversation
            })
            console.log('feedback', response?.data);
            const Content = response?.data.Feedback.feedback

            console.log('finalcontent', Content);
            console.log('interviewInfo', interviewInfo);



            //save to db
            const { data, error } = await supabase
                .from('Interview-feedback')
                .insert([
                    {
                        userEmail: interviewInfo?.UserEmail,
                        userName: interviewInfo?.Username,
                        interviewId: InterviewID,
                        feedBack: Content,
                        recommended: response?.data.Feedback.feedback.Recommendation
                    },
                ])
                .select()
            setloading(false)
            console.log(data);
            router.replace('/interview/' + InterviewID + '/completed')

        } catch (error) {
            console.log(error);
            setloading(false)
        }
        finally {
            setloading(false)
        }
    }
    // Parse interview duration string like "5 Min" to get minutes as number
    const parsedDuration = parseInt(interviewInfo?.InterviewData?.InterviewDuration?.replace(/[^\d]/g, '')) || 0;
    return (
        <div className='min-h-screen w-full p-20 bg-secondary'>
            <div className='flex w-full justify-between items-center'>
                <h1 className='font-medium text-xl'>AI Interview Session</h1>
                <div className='flex items-center gap-x-1'>
                    <Timer />  <TimerComponent durationInMinutes={parsedDuration} />
                </div>


            </div>
            <div className='mt-5  flex items-center gap-5 flex-wrap justify-around'>
                <div className={`${activeSpeaker === 'ai' ? 'border-2 animate-pulse border-emerald-400' : ''}  w-[400px] h-[400px] bg-white rounded-xl flex flex-col items-center justify-center`}>
                    <Image src={'/ai-interviewer.webp'} height={50} width={60} className='px-3 py-1 rounded-full bg-secondary' alt='ai-interviewer' />
                    <h2 className='mt-2'>NextHire</h2>
                </div>
                <div className={`${activeSpeaker === 'user' ? 'border-2 animate-pulse border-emerald-400' : ''} w-[400px] h-[400px] bg-white rounded-xl flex items-center justify-center`}>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='bg-primary text-white px-5 py-3 text-xl capitalize rounded-full'>{interviewInfo?.Username[0]}</h1>
                        <h2>{interviewInfo?.Username}</h2>
                    </div>
                </div>
            </div>
            <div className='mt-6  gap-x-3 w-full flex justify-center items-center'>
                <Mic size={50} className='bg-primary/20 p-3 rounded-xl' />
                {!loading ? <Phone
                    size={50}
                    className='cursor-pointer bg-red-400 p-3 rounded-xl'
                    onClick={StopInterviewMethod}
                /> : <div className='text-white cursor-pointer bg-red-400 p-3 rounded-xl '> <Loader2 className='animate-spin' /></div>}
            </div>
            {!loading ? <h2 className='text-gray-400 animate-pulse'>Interview in progess... </h2> : <h2 className='text-emerald-400 animate-pulse'>Generating feedback... </h2>}
        </div>
    )
}

export default startInterview