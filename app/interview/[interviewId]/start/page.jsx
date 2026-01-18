'use client'
import { InterviewContext } from '@/context/InterviewContext'
import { Loader2, Mic, Phone, Timer, Sparkles, Volume2 } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { supabase } from '../../../../services/supabase-client'
import { toast } from 'sonner'
import axios from 'axios'
import TimerComponent from '../../_components/TimerComponent'
import { useParams, useRouter } from 'next/navigation'
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk"

const StartInterview = () => {
    const { interviewInfo } = useContext(InterviewContext)
    const [Conversation, setConversation] = useState([]) // Array of {role, content}
    const [activeSpeaker, setActiveSpeaker] = useState(null) // 'ai', 'user', or null
    const [isCallActive, setIsCallActive] = useState(false)
    const [loading, setLoading] = useState(false) // For AI processing state
    const router = useRouter()
    const { interviewId: InterviewID } = useParams()

    const micStreamRef = useRef(null) // To stop tracks

    const mediaRecorderRef = useRef(null)
    const connectionRef = useRef(null)
    const deepgramRef = useRef(null)
    const isProcessingRef = useRef(false)
    const audioRef = useRef(null)
    const interruptedRef = useRef(false)

    const isAISpeakingRef = useRef(false) // dedicated ref to cover thinking + speaking time

    useEffect(() => {
        if (!interviewInfo) {
            router.replace(`/interview/${InterviewID}`)
        }
    }, [interviewInfo, InterviewID, router])

    const startDeepgram = async () => {
        try {
            // 1. Get Ephemeral Key
            const keyRes = await axios.get('/api/create-deepgram-key')
            const apiKey = keyRes.data.key

            if (!apiKey) throw new Error("Could not retrieve voice credentials")

            deepgramRef.current = createClient(apiKey)

            // 2. Setup Audio Hook & Socket
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            micStreamRef.current = stream // Store for cleanup

            // Robust MIME type selection
            let mimeType = 'audio/webm'
            if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                mimeType = 'audio/webm;codecs=opus'
            } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                mimeType = 'audio/mp4' // Safari usually wants this
            }

            console.log("Using MIME type:", mimeType)

            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType })

            // 3. Open Realtime Connection
            const connection = deepgramRef.current.listen.live({
                model: "nova-2",
                language: "en-US",
                smart_format: true,
                interim_results: true,
                vad_events: true,
                endpointing: 500, // Wait 500ms before finalizing a phrase
                endpointing: 500, // Wait 500ms before finalizing a phrase
                utterance_end_ms: 3000,
                encoding: mimeType.includes('mp4') ? 'aac' : 'opus',
            })

            connectionRef.current = connection

            // 4. Handle Socket Events
            connection.on(LiveTranscriptionEvents.Open, () => {
                console.log("Deepgram Connection Open")
                setIsCallActive(true)

                // Start sending data
                mediaRecorderRef.current.addEventListener('dataavailable', event => {
                    if (event.data.size > 0 && connection.getReadyState() === 1) {
                        connection.send(event.data)
                    }
                })
                // Only start if not already recording
                if (mediaRecorderRef.current.state !== 'recording') {
                    mediaRecorderRef.current.start(250) // Send chunk every 250ms
                }

                // Trigger Greeting
                handleAIResponse("Hi, I am ready to begin your interview.")
            })

            connection.on(LiveTranscriptionEvents.Transcript, (data) => {
                const transcript = data.channel?.alternatives?.[0]?.transcript
                const isFinal = data?.is_final

                if (transcript && isFinal) {
                    console.log("User said:", transcript)
                    // Only switch valid user speaker if AI is NOT talking or thinking
                    if (!isAISpeakingRef.current) {
                        setActiveSpeaker('user')
                    }
                }
            })

            connection.on(LiveTranscriptionEvents.SpeechStarted, () => {
                // Block internal speaker flip if AI is talking (Crosstalk)
                if (!isAISpeakingRef.current) {
                    setActiveSpeaker('user')
                }
            })

            connection.on(LiveTranscriptionEvents.UtteranceEnd, (data) => {
                // This fires when Deepgram detects user finished speaking a sentence/phrase
                console.log("Utterance Ended (3s silence)")
                // Only process if chance to speak
                if (!isAISpeakingRef.current) {
                    processUserTurn()
                }
            })

            connection.on(LiveTranscriptionEvents.Close, () => {
                console.log("Deepgram closed")
                setIsCallActive(false)
            })

            connection.on(LiveTranscriptionEvents.Error, (err) => {
                console.error("Deepgram error", err)
            })

        } catch (error) {
            console.error("Failed to start audio", error)
            toast.error("Could not start microphone")
        }
    }

    // Capture the latest transcript accumulation to send to AI
    // Since 'transcriptreceived' fires often, we might need a ref to store the "Current Sentence"
    // For this simple version, we will just rely on the fact that we process the request 
    // when Silence is detected or UtteranceEnds.

    // We need a stable way to get "What did user just say?" 
    // Deepgram sends fragments. We need to maintain a buffer.
    const transcriptBufferRef = useRef("")

    // Update buffer on transcript
    useEffect(() => {
        if (!connectionRef.current) return

        const onTranscript = (data) => {
            const alt = data.channel?.alternatives?.[0]
            if (alt?.transcript) {
                if (data.is_final) {
                    transcriptBufferRef.current += " " + alt.transcript
                }
            }
        }

        connectionRef.current.on(LiveTranscriptionEvents.Transcript, onTranscript)
        return () => {
            connectionRef.current?.removeListener(LiveTranscriptionEvents.Transcript, onTranscript)
        }
    }, [isCallActive])

    // Manual Interruption Handle
    const handleInterrupt = () => {
        // 1. If AI is Speaking -> Stop Audio
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }

        isAISpeakingRef.current = false // Force release lock
        setActiveSpeaker(null)

        // 2. If AI is Thinking -> Cancel processing flag so we ignore result
        if (loading || isProcessingRef.current) {
            interruptedRef.current = true
            setLoading(false)
            isProcessingRef.current = false
            toast.info("Interrupted")
        }
    }


    const processUserTurn = async () => {
        if (isProcessingRef.current || !transcriptBufferRef.current.trim()) return

        const userInput = transcriptBufferRef.current.trim()
        transcriptBufferRef.current = "" // Clear buffer

        isProcessingRef.current = true
        isAISpeakingRef.current = true // Lock the turn for AI
        setLoading(true)
        setActiveSpeaker('ai') // Fake it immediately for better UI
        interruptedRef.current = false // Reset interruption flag

        try {
            // Update Context
            const newHistory = [...Conversation, { role: 'user', content: userInput }]
            setConversation(newHistory)

            // Get AI Response
            const aiRes = await axios.post('/api/process-interview', {
                history: newHistory,
                lastUserInput: userInput,
                jobPosition: interviewInfo?.InterviewData?.JobPosition,
                questionList: interviewInfo?.InterviewData?.QuestionList?.map(q => q.question).join(', ')
            })

            if (interruptedRef.current) {
                console.log("AI response ignored due to interruption")
                isAISpeakingRef.current = false // Release lock if interrupted
                return
            }

            const aiText = aiRes.data.result

            // Update Context with AI Reply
            setConversation(prev => [...prev, { role: 'ai', content: aiText }])

            // Speak it
            await handleAIResponse(aiText)

        } catch (err) {
            console.error("AI processing error", err)
            isAISpeakingRef.current = false // Release lock on error
            // Log the detailed server response if available
            if (err.response) {
                console.error("Server Error Details:", err.response.data)
                toast.error(`AI Error: ${err.response.data?.details || err.message}`)
            } else {
                toast.error("Failed to get AI response")
            }
        } finally {
            isProcessingRef.current = false
            setLoading(false)
            // Don't nullify speaker if AI keeps talking, but here we just finished logic
            // Note: isAISpeakingRef is handled in handleAIResponse or audio ended
            if (!audioRef.current || audioRef.current.paused) {
                // Fallback if something weird happened
            }
        }
    }

    const handleAIResponse = async (text) => {
        setActiveSpeaker('ai')
        isAISpeakingRef.current = true // Ensure locked

        try {
            // Use Deepgram TTS
            // We need to call it via server or if we have a key we can call direct. 
            // Since we have an ephemeral key with 'usage:write', we CAN call TTS directly from client!

            const TTS_URL = `https://api.deepgram.com/v1/speak?model=aura-asteria-en`
            const deepgramApiKey = deepgramRef.current?.key || (await axios.get('/api/create-deepgram-key')).data.key // Fallback

            const response = await fetch(TTS_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${deepgramApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            })

            if (!response.ok) throw new Error("TTS Failed")

            const blob = await response.blob()
            const audioUrl = URL.createObjectURL(blob)

            // Stop any existing audio
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
            }

            const audio = new Audio(audioUrl)
            audioRef.current = audio

            audio.onended = () => {
                isAISpeakingRef.current = false // Unlock
                setActiveSpeaker('user') // Pass turn to user
            }

            await audio.play()

        } catch (error) {
            console.error("TTS Error", error)
            isAISpeakingRef.current = false // Unlock on error
            setActiveSpeaker(null)
        }
    }

    const stopCall = async () => {
        // Cleanup
        if (mediaRecorderRef.current) mediaRecorderRef.current.stop()
        if (connectionRef.current) connectionRef.current.finish()

        // Stop Microphone Stream Hard
        if (micStreamRef.current) {
            micStreamRef.current.getTracks().forEach(track => track.stop())
            micStreamRef.current = null
        }

        // Stop AI Audio Output
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }

        setIsCallActive(false)

        // Save & Redirect
        // (Similar to previous implementation)
        toast.success("Interview Completed")
        router.replace('/interview/' + InterviewID + '/completed')
    }

    const parsedDuration = parseInt(interviewInfo?.InterviewData?.InterviewDuration?.replace(/[^\d]/g, '')) || 0

    return (
        <div className="h-screen bg-black p-6 relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02]" />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="relative z-10 h-full flex flex-col max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <img src="/logo.svg" alt="NextHire" className="h-7 invert opacity-80" />
                        {interviewInfo?.InterviewData?.JobPosition && (
                            <span className="text-white/40 text-sm font-light">/ {interviewInfo?.InterviewData?.JobPosition}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                        <div className={`w-1.5 h-1.5 rounded-full ${isCallActive ? 'bg-white animate-pulse' : 'bg-white/40'}`} />
                        <Timer className="w-3.5 h-3.5 text-white/50" />
                        {isCallActive ? (
                            <TimerComponent durationInMinutes={parsedDuration} />
                        ) : (
                            <span className="text-white/50 text-sm">Ready</span>
                        )}
                    </div>
                </div>

                {/* Participants */}
                <div className="flex-1 grid md:grid-cols-2 gap-6 mb-8">
                    {/* AI Card */}
                    <div className={`relative rounded-2xl p-6 transition-all duration-500 border ${activeSpeaker === 'ai'
                        ? 'bg-white/[0.08] border-white/30'
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'
                        }`}>
                        <div className="flex flex-col items-center">
                            <div className={`relative w-20 h-20 rounded-xl mb-4 overflow-hidden transition-all ${activeSpeaker === 'ai' ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-black' : ''}`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5" />
                                <Image src={'/interviewer.png'} height={80} width={80} className="relative z-10 object-cover" alt="AI" />
                            </div>

                            <h2 className="text-lg font-medium text-white mb-0.5">NextHire AI</h2>
                            <p className="text-xs text-white/40 mb-4">Interviewer</p>

                            {/* Voice visualizer */}
                            <div className="flex items-center justify-center gap-1 h-6">
                                {activeSpeaker === 'ai' ? (
                                    [0, 1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-1 bg-white rounded-full animate-pulse"
                                            style={{
                                                height: `${8 + Math.random() * 16}px`,
                                                animationDelay: `${i * 0.15}s`,
                                                animationDuration: '0.6s'
                                            }}
                                        />
                                    ))
                                ) : (
                                    <span className="text-[10px] text-white/30 uppercase tracking-widest">Idle</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* User Card */}
                    <div className={`relative rounded-2xl p-6 transition-all duration-500 border ${activeSpeaker === 'user'
                        ? 'bg-white/[0.08] border-white/30'
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'
                        }`}>
                        <div className="flex flex-col items-center">
                            <div className={`relative w-20 h-20 rounded-xl mb-4 flex items-center justify-center text-2xl font-medium transition-all ${activeSpeaker === 'user'
                                ? 'bg-white text-black ring-2 ring-white/50 ring-offset-2 ring-offset-black'
                                : 'bg-white/10 text-white/60'
                                }`}>
                                {interviewInfo?.Username?.[0]?.toUpperCase() || 'U'}
                            </div>

                            <h2 className="text-lg font-medium text-white capitalize mb-0.5">{interviewInfo?.Username || 'Candidate'}</h2>
                            <p className="text-xs text-white/40 mb-4">Candidate</p>

                            {/* Voice visualizer */}
                            <div className="flex items-center justify-center gap-1 h-6">
                                {activeSpeaker === 'user' ? (
                                    [0, 1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-1 bg-white rounded-full animate-pulse"
                                            style={{
                                                height: `${8 + Math.random() * 16}px`,
                                                animationDelay: `${i * 0.15}s`,
                                                animationDuration: '0.6s'
                                            }}
                                        />
                                    ))
                                ) : (
                                    <span className="text-[10px] text-white/30 uppercase tracking-widest">Idle</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3">
                        {!isCallActive ? (
                            <button
                                onClick={startDeepgram}
                                className="group px-8 py-3.5 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all flex items-center gap-2"
                            >
                                <Mic className="w-4 h-4" />
                                Start Interview
                            </button>
                        ) : (
                            <>
                                {loading || activeSpeaker === 'ai' ? (
                                    <button
                                        onClick={handleInterrupt}
                                        className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all flex items-center gap-2 border border-white/20"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /></svg>
                                        Interrupt
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => processUserTurn()}
                                        className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                                        Submit Answer
                                    </button>
                                )}

                                <button
                                    onClick={stopCall}
                                    className="w-12 h-12 rounded-xl bg-white/10 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 flex items-center justify-center text-white/60 hover:text-red-400 transition-all"
                                >
                                    <Phone className="w-5 h-5 rotate-[135deg]" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Status */}
                    <p className={`text-xs font-light ${loading ? 'text-white/60' : 'text-white/40'}`}>
                        {loading ? 'AI is thinking...' : isCallActive ? 'Speak naturally. Auto-submit after 3s silence.' : 'Click Start to begin'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default StartInterview