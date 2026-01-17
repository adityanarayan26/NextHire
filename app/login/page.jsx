'use client';
import { supabase } from "../../services/supabase-client";
import { RiGoogleFill } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Users, Sparkles } from "lucide-react";

const Page = () => {
    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })
        if (error) {
            console.error("Error signing in with Google:", error.message);
        }
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <img src="/logo.svg" alt="NextHire" className="h-10 mx-auto mb-4" />
                    <p className="text-[#64748b] mt-1">AI-Powered Interview Platform</p>
                </div>

                {/* Login Card */}
                <div className="pro-card p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-bold text-[#0f172a] mb-1">Welcome Back</h2>
                        <p className="text-[#64748b] text-sm">Sign in to manage your interviews</p>
                    </div>

                    {/* Google Button */}
                    <Button
                        onClick={signInWithGoogle}
                        className="w-full h-12 text-base font-medium bg-white hover:bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0] gap-3 rounded-xl shadow-soft"
                    >
                        <RiGoogleFill className="w-5 h-5 text-[#ea4335]" />
                        Continue with Google
                    </Button>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#e2e8f0]"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-[#94a3b8]">Why NextHire?</span>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-9 h-9 rounded-lg bg-[#e8eaf6] flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-4 h-4 text-[#4945d1]" />
                            </div>
                            <span className="text-[#64748b]">AI-generated interview questions</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-9 h-9 rounded-lg bg-[#d1fae5] flex items-center justify-center flex-shrink-0">
                                <Users className="w-4 h-4 text-[#059669]" />
                            </div>
                            <span className="text-[#64748b]">Screen unlimited candidates</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-9 h-9 rounded-lg bg-[#e0f2fe] flex items-center justify-center flex-shrink-0">
                                <Zap className="w-4 h-4 text-[#0284c7]" />
                            </div>
                            <span className="text-[#64748b]">Automated feedback & scoring</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-[#94a3b8] mt-6">
                    By continuing, you agree to our Terms of Service
                </p>
            </div>
        </div>
    );
};

export default Page;
