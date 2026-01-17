"use client"
import { useState } from 'react'
import { Star, Send, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/services/supabase-client'
import { UseUser } from '@/app/Provider'

export default function FeedbackPage() {
    const { user } = UseUser()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [hoveredRating, setHoveredRating] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (rating === 0) {
            toast.error("Please select a rating before submitting.")
            return
        }

        setIsSubmitting(true)

        try {
            const { data, error } = await supabase
                .from('User-feedback')
                .insert([
                    {
                        rating: rating,
                        comment: comment,
                        userEmail: user?.email || 'anonymous',
                        userName: user?.name || 'Anonymous User',
                        createdAt: new Date().toISOString()
                    }
                ])

            if (error) {
                console.error('Supabase error:', error)
                toast.error("Failed to submit feedback. Please try again.")
                setIsSubmitting(false)
                return
            }

            toast.success("Thank you for your feedback!")
            setSubmitted(true)
            setRating(0)
            setComment('')
        } catch (err) {
            console.error('Error:', err)
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitted) {
        return (
            <div className="p-10 max-w-4xl mx-auto">
                <div className="bg-white p-12 rounded-xl border shadow-sm text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                    <p className="text-gray-500 mb-6">
                        Your feedback has been submitted successfully. We appreciate your input!
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-900 transition-all"
                    >
                        Submit Another Feedback
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-10 max-w-4xl mx-auto">
            <div className='flex items-center justify-between mb-2'>
                <h2 className='font-bold text-3xl text-primary'>Feedback</h2>
            </div>

            <p className="text-gray-500 mb-8">
                Your feedback helps us improve NextHire. We'd love to hear from you!
            </p>

            <div className="bg-white p-8 rounded-xl border shadow-sm">
                <form onSubmit={handleSubmit}>

                    {/* Rating Section */}
                    <div className="mb-8">
                        <label className="block text-lg font-medium text-gray-700 mb-3">
                            How was your experience with NextHire?
                        </label>
                        <div className="flex gap-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95 duration-200"
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    onClick={() => setRating(star)}
                                    aria-label={`Rate ${star} stars`}
                                >
                                    <Star
                                        size={36}
                                        className={`${(hoveredRating || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 stroke-2'}`}
                                    />
                                </button>
                            ))}
                        </div>
                        {rating > 0 && (
                            <div className="mt-2 font-medium text-primary text-sm animate-fade-in">
                                {rating === 1 && "Terrible"}
                                {rating === 2 && "Bad"}
                                {rating === 3 && "Okay"}
                                {rating === 4 && "Good"}
                                {rating === 5 && "Excellent"}
                            </div>
                        )}
                    </div>

                    {/* Comment Section */}
                    <div className="mb-8">
                        <label className="block text-lg font-medium text-gray-700 mb-3">
                            Tell us more (optional)
                        </label>
                        <textarea
                            rows={5}
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-gray-700 placeholder:text-gray-400"
                            placeholder="What did you like? What can we do better?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`
                                bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg flex items-center gap-2 
                                hover:bg-blue-900 transition-all shadow-md hover:shadow-lg
                                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                            `}
                        >
                            {isSubmitting ? 'Submitting...' : (
                                <>
                                    Submit Feedback
                                    <Send size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
