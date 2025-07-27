'use client';
import React, { useContext, useEffect } from 'react'
import { supabase } from '../services/supabase-client'
import { UserDetailContext } from '../context/UserDetailContext'
import {FeedbackContext} from '../context/FeedbackContext'
const Provider = ({ children }) => {
    const [user, setuser] = React.useState()
    const [feedbackCredentials, setFeedbackCredentials] = React.useState()
    useEffect(() => {
        createNewUser()
    }, [])


    const createNewUser = async () => {
        supabase.auth.getUser().then(async ({ data: { user } }) => {
            let { data: Users, error } = await supabase
                .from('Users')
                .select("*")
                .eq('email', user?.email)

            console.log(Users);

            if (Users?.length == 0) {
                const { data, error } = await supabase.from('Users').insert([{
                    name: user?.user_metadata?.name,
                    email: user?.email,
                    pictures: user?.user_metadata?.avatar_url || user?.user_metadata?.picture || user?.avatar_url,
                }])
                console.log(data);
                setuser(data)
                return
            }
            setuser(Users[0])
        })
    }
    return (
        <UserDetailContext.Provider value={{ user, setuser }}>
<FeedbackContext.Provider value={{feedbackCredentials, setFeedbackCredentials}}>

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