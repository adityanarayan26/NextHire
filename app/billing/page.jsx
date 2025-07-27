import React from 'react'

const BillingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Choose Your Plan</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Free</h2>
          <p className="text-4xl font-bold text-gray-800 mt-4">$0<span className="text-base font-medium">/mo</span></p>
          <p className="text-gray-600 mt-2">For individuals just getting started.</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>✓ Basic interview access</li>
            <li>✓ Limited transcripts</li>
            <li>✓ 1 Project</li>
          </ul>
          <button className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Get Started</button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-lg shadow p-6 border-2 border-blue-500">
          <h2 className="text-xl font-semibold text-gray-900">Pro</h2>
          <p className="text-4xl font-bold text-gray-800 mt-4">$19<span className="text-base font-medium">/mo</span></p>
          <p className="text-gray-600 mt-2">For professionals conducting regular interviews.</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>✓ Unlimited interviews</li>
            <li>✓ Advanced analytics</li>
            <li>✓ 10 Projects</li>
            <li>✓ Priority support</li>
          </ul>
          <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Upgrade</button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Enterprise</h2>
          <p className="text-4xl font-bold text-gray-800 mt-4">Custom</p>
          <p className="text-gray-600 mt-2">For large teams and organizations.</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>✓ All Pro features</li>
            <li>✓ Dedicated support</li>
            <li>✓ SLA & compliance</li>
            <li>✓ Unlimited projects</li>
          </ul>
          <button className="mt-6 w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900">Contact Sales</button>
        </div>
      </div>
    </div>
  )
}

export default BillingPage
