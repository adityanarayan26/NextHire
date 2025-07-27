import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CreateOptions = () => {
    return ( 
        <div className='  capitalize'>
            <div className='border rounded-2xl p-5 bg-white'>
                <Link href={'/dashboard/createInterview'} >
                <div className='flex items-center gap-x-3 my-2'>

                <Video className='p-3 text-primary bg-primary/50 rounded-lg size-12' />
                <div className='flex flex-col justify-center'>

                <h2 className='font-bold'>Create New Interview</h2>
                <h2 className='text-gray-500'>Create AI Interview and schedule them with candidates</h2>
                </div>
                </div>
                </Link>
            </div>
           
        </div>
    )
}

export default CreateOptions
