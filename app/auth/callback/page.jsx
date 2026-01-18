'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/services/supabase-client'

export default function AuthCallbackPage() {
    const router = useRouter()

    useEffect(() => {
        const handleCallback = async () => {
            // Check if there's a hash fragment (implicit flow)
            if (window.location.hash) {
                // Supabase client automatically handles the hash fragment
                const { data, error } = await supabase.auth.getSession()

                if (error) {
                    console.error('Auth callback error:', error.message)
                    router.push('/login?error=' + encodeURIComponent(error.message))
                    return
                }

                if (data.session) {
                    router.push('/dashboard')
                    return
                }
            }

            // Check for code parameter (PKCE flow)
            const params = new URLSearchParams(window.location.search)
            const code = params.get('code')

            if (code) {
                const { error } = await supabase.auth.exchangeCodeForSession(code)

                if (error) {
                    console.error('Code exchange error:', error.message)
                    router.push('/login?error=' + encodeURIComponent(error.message))
                    return
                }

                router.push('/dashboard')
                return
            }

            // No auth data found
            router.push('/login')
        }

        handleCallback()
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white/60 text-sm">Completing authentication...</p>
            </div>
        </div>
    )
}
