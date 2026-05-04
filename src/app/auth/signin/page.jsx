'use client'

import { authClient } from '@/lib/auth-client';
import { Eye, EyeSlash } from '@gravity-ui/icons';
import { Button, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from "react-toastify";

const SignInPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Email & Password Sign In Logic
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())
        console.log('Signin sucessfully', userData);
        
        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
            rememberMe: true,
            callbackURL: '/alltiles'
        });
        
        console.log("Signin Success:", data);
        console.log("Signin Error:", error);
        
        if (error) {
            toast("Error sign In: " + error.message)
        }
        if (data) {
            toast('Sign In sucessfully')

            window.location.href = "/alltiles";
        }
    }

    const handleGoogleSignIn = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
        });

        if (error) {
            toast("Error signing in with Google: " + error.message);
        }

        if (data) {
            toast("Google Sign In Successful!");
        }
    };

    return (
        <div className="min-h-[70vh] py-10 bg-gradient-to-r to-[#01110c] from-[#0f0027] text-white flex items-center justify-center">

            <div className="w-full max-w-xl bg-[#11141F] mx-auto border border-[#1F2436] shadow-2xl rounded-2xl p-8 sm:p-10">
         
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-sm text-gray-400">Please sign in to your account</p>
                </div>

                <Form
                    className="flex flex-col gap-5 w-full"
                    render={(props) => <form {...props} data-custom="foo" />}
                    onSubmit={onSubmit}
                >

                    <TextField
                        isRequired
                        type="email"
                        className="w-full"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="mb-1 text-sm font-medium text-gray-300">Email</Label>
                        <Input 
                            name="email" 
                            placeholder="Enter Your Email" 
                            className="bg-[#181B27] border-[#2D3142] text-white h-12 rounded-xl"
                        />
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                
                    <TextField className="w-full" name="password">
                        <Label className="mb-1 text-sm font-medium text-gray-300">Password</Label>
                        <div className="relative w-full">
                            <Input
                                name="password"
                                className="w-full bg-[#181B27] border-[#2D3142] text-white h-12 rounded-xl pr-10"
                                type={isVisible ? "text" : "password"}
                                placeholder='Enter Your Password'
                            />
                      
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-400 hover:text-white focus:outline-none"
                                onClick={() => setIsVisible(!isVisible)}
                                aria-label={isVisible ? "Hide password" : "Show password"}
                            >
                                {isVisible ? <Eye className="size-5" /> : <EyeSlash className="size-5" />}
                            </button>
                        </div>
                    </TextField>

                    
                    <p className="text-right mt-[-8px]">
                        <span className="text-sm text-blue-500 font-medium cursor-pointer hover:underline hover:text-blue-400 transition-colors">
                            Forgot Password?
                        </span>
                    </p>

           
                    <div className="flex gap-2 mt-2">
                        <Button 
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity" 
                            type="submit"
                        >
                            Sign In
                        </Button>
                    </div>

  
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-[#2D3142]"></div>
                        <span className="mx-4 text-gray-500 text-sm font-medium">or</span>
                        <div className="flex-grow border-t border-[#2D3142]"></div>
                    </div>
                    <div className="w-full flex flex-col gap-5">

                        <Button

                            onClick={handleGoogleSignIn}
                            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-[#2D3142] bg-[#181B27] text-sm font-bold text-[#E2E8F0] transition-all hover:bg-[#1F2436] hover:border-gray-500"
                        >
                            <FcGoogle className="size-5" />
                            Continue with Google
                        </Button>

         
                        <div className="text-center text-sm text-[#94A3B8]">
                            Don&apos;t have an account?{" "}
                            <Link href="/auth/signup" className="font-semibold text-[#4D80FF] hover:underline hover:text-[#6B4DFF] transition-colors">
                                Sign Up
                            </Link>
                        </div>
                    </div>

                </Form>
            </div>
        </div>
    );
};

export default SignInPage;