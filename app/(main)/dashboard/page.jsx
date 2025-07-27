import React from 'react'
// import WelcomeComponent from '../_components/WelcomeComponent'
import CreateOptions from '../_components/CreateOptions'
import PreviouslyCreatedInterview from '../_components/PreviouslyCreatedInterview'
const page = () => {

  return (
    <div className=''>
{/* <WelcomeComponent/> */}
<h1 className='text-lg font-bold pt-10 pb-3'>Dashboard</h1>


<CreateOptions/>
<PreviouslyCreatedInterview/>

    </div>
  )
}

export default page
