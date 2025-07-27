'use client'; // ✅ This must be the first line

import { FeedbackContext } from '@/context/FeedbackContext';
import { supabase } from '@/services/supabase-client';

import React, { use, useContext, useEffect } from 'react'

const FeedbackPage = () => {
  const[feedbackList, setFeedbackList] = React.useState([]);
const {feedbackCredentials, setFeedbackCredentials}=useContext(FeedbackContext)
feedbackCredentials&&console.log(feedbackCredentials);
useEffect(() => {
  if (feedbackCredentials?.length > 0) {
    getFeedbackList();
  }
}, [feedbackCredentials]);
const getFeedbackList = async () => {
  try {
    const { data: InterviewFeedback, error } = await supabase
      .from('Interview-feedback')
      .select('*')
      .eq('interviewId', feedbackCredentials)


    if (error) {
      console.error('Error fetching feedback:', error);
      setFeedbackList([]);
    } else {
      console.log('InterviewFeedback', InterviewFeedback);
      setFeedbackList(InterviewFeedback || []);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    setFeedbackList([]);
  }
};
  return (
    <div className="min-h-screen w-full p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 my-12">
          Interview Feedback
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
          {feedbackList.length === 0 ? (
            <p className="text-center text-gray-500 py-12 text-lg">
              No interview feedback available.
            </p>
          ) : (
            feedbackList.map((item, id) => (
              <div key={id} className="border border-gray-200 rounded-xl p-5 space-y-4 bg-gray-50 hover:shadow transition">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <h2 className="text-lg font-semibold text-gray-800">👤 {item?.userName}</h2>
                  <p className="text-sm text-gray-500">{item?.userEmail}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Ratings:</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {item?.feedBack?.rating &&
                      Object.entries(item.feedBack.rating).map(([category, value], index) => (
                        <div key={index} className="flex justify-between">
                          <span className="capitalize text-gray-700">{category}</span>
                          <span className="text-yellow-500 font-medium">{value}/5</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Summary:</h3>
                  <p className="text-gray-700 text-sm">{item?.feedBack?.summary}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Recommendation:</h3>
                  <p className="text-gray-700 text-sm">{item?.feedBack?.Recommendation}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Message:</h3>
                  <p className="text-gray-700 text-sm">{item?.feedBack?.RecommendationMsg}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;