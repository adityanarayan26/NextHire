'use client';
import { supabase } from "../../services/supabase-client";
import { RiFacebookFill, RiGithubFill, RiGoogleFill, RiTwitterXFill } from "@remixicon/react";
import { Button } from "@/components/ui/button";

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
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                  <Button onClick={signInWithGoogle} className="bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90">
        <span className="pointer-events-none me-2 flex-1">
          <RiGoogleFill className="opacity-60" size={16} aria-hidden="true" />
        </span>
        Login with Google
      </Button>

        </div>
    );
};

export default Page;
