import AuroraHero from '@/components/ui/digital-aurora'
import React from 'react'

const page = () => {
  return (
    <div>
      <AuroraHero
        title="NextHire"
        description="Streamline your hiring process with our advanced AI-powered recruitment platform. Find the best talent faster and more efficiently."
        badgeText="2.0 Now Live"
        badgeLabel="New"
        ctaButtons={[
          { text: "Get Started", href: "/login", primary: true },
          { text: "View Demo", href: "#demo", primary: false }
        ]}
        microDetails={[
          "AI Analysis",
          "Automated Screening",
          "Real-time Insights"
        ]}
      />
    </div>
  )
}

export default page
