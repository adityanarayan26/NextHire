'use client';
import React, { useContext, useEffect } from 'react'
import { supabase } from '../services/supabase-client'
import { UserDetailContext } from '../context/UserDetailContext'
import { FeedbackContext } from '../context/FeedbackContext'
import { useRouter, usePathname } from 'next/navigation';

const Provider = ({ children }) => {
    const [user, setuser] = React.useState()
    const [feedbackCredentials, setFeedbackCredentials] = React.useState()
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const createNewUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                // Allow access to public routes manually
                const publicRoutes = ['/', '/login', '/auth/callback'];
                if (!publicRoutes.includes(pathname)) {
                    router.push('/login');
                }
                return;
            }

            // If user is authenticated and tries to access login, redirect to dashboard
            if (pathname === '/login') {
                router.push('/dashboard');
                return;
            }

            let { data: Users, error } = await supabase
                .from('Users')
                .select("*")
                .eq('email', user.email);

            if (Users?.length === 0) {
                const { data, error } = await supabase.from('Users').insert([{
                    name: user.user_metadata?.name,
                    email: user.email,
                    pictures: user.user_metadata?.avatar_url || user.user_metadata?.picture || user.avatar_url,
                }]);
                setuser(data);
                return;
            }

            setuser(Users[0]);
        };

        createNewUser();
    }, [pathname])


    return (
        <UserDetailContext.Provider value={{ user, setuser }}>
            <FeedbackContext.Provider value={{ feedbackCredentials, setFeedbackCredentials }}>

                <div>

                    {children}
                </div>
            </FeedbackContext.Provider>
        </UserDetailContext.Provider>
    )
}

export default Provider

export const UseUser = () => {
    const context = useContext(UserDetailContext)
    return context
}