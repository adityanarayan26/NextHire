'use client';
import { supabase } from "../../services/supabase-client";
import { RiGoogleFill } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Users, Sparkles } from "lucide-react";
import { ShaderBackground } from "@/components/ui/digital-aurora";

const Page = () => {
    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })
        if (error) {
            console.error("Error signing in with Google:", error.message);
        }
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background */}
            <ShaderBackground />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-md p-6">
                {/* Glass Card */}
                <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl p-8 shadow-2xl">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-light tracking-tight text-white mb-2">Welcome Back</h1>
                        <p className="text-white/50 text-sm font-light">Sign in to access your intelligent workspace</p>
                    </div>

                    {/* Login Action */}
                    <div className="space-y-6">
                        <Button
                            onClick={signInWithGoogle}
                            className="w-full h-14 bg-white text-black hover:bg-gray-100 border-none transition-all duration-300 rounded-xl font-medium text-base shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 group"
                        >
                            <RiGoogleFill className="w-5 h-5 transition-transform group-hover:scale-110" />
                            <span>Continue with Google</span>
                        </Button>

                        <div className="relative flex items-center gap-4 py-2">
                            <div className="h-[1px] bg-white/10 flex-1"></div>
                            <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">Secure Access</span>
                            <div className="h-[1px] bg-white/10 flex-1"></div>
                        </div>


                    </div>
                </div>


            </div>
        </div>
    );
};

export default Page;
