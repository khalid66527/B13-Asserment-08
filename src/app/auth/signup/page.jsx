"use client";
import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import { useState } from "react";

const SignUpPage = () => {
    const [isVisible, setIsVisible] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())
        console.log('Form submitted with :', userData);



        const { data, error } = await authClient.signUp.email({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            image: userData.image,
            callbackURL: "/"
        });

        console.log("Signup Success:", data);
        console.log("Signup Error:", error);
        if (error) {
            alert("Error signing up " + error.message)
        }
        if (data) {
            alert('Sign up successful! Please login.');
            window.location.href = "/auth/signin";
        }

    };



    return (
        <div className="min-h-[70vh] py-10 bg-gradient-to-r to-[#01110c] from-[#0f0027] text-white flex items-center justify-center">

            <div className="w-full max-w-xl bg-[#11141F] mx-auto border border-[#1F2436] shadow-2xl rounded-2xl p-8 sm:p-10">
                
                {/* Header Section */}
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Create an Account</h2>
                    <p className="text-sm text-gray-400">Join us to explore premium tiles</p>
                </div>

                <Form
                    className="flex flex-col gap-5 w-full"
                    render={(props) => <form {...props} data-custom="foo" />}
                    onSubmit={onSubmit}
                >
                    {/* Name Field */}
                    <TextField
                        isRequired
                        className="w-full"
                        validate={(value) => {
                            if (value.length < 3) {
                                return "Name must be at least 3 characters";
                            }
                            return null;
                        }}
                    >
                        <Label className="mb-1 text-sm font-medium text-gray-300">Name</Label>
                        <Input 
                            name="name" 
                            placeholder="Enter Your Name" 
                            className="bg-[#181B27] border-[#2D3142] text-white h-12 rounded-xl"
                        />
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    {/* Image URL Field */}
                    <TextField
                        isRequired
                        className="w-full"
                        validate={(value) => {
                            // URL বা Base64 লিংক ভ্যালিডেশন
                            if (!value || value.length < 10) {
                                return "Please enter a valid Image URL or Base64 link";
                            }
                            return null;
                        }}
                    >
                        <Label className="mb-1 text-sm font-medium text-gray-300">Profile Image URL</Label>
                        <Input
                            name="image"
                            type="url"
                            placeholder="Enter Image Link (http:// or data:image/...)"
                            className="bg-[#181B27] border-[#2D3142] text-white h-12 rounded-xl"
                        />
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    {/* Email Field */}
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

                    {/* Password Field */}
                    <TextField className="w-full" name="password">
                        <Label className="mb-1 text-sm font-medium text-gray-300">Password</Label>
                        <div className="relative w-full">
                            <Input
                                name="password"
                                className="w-full bg-[#181B27] border-[#2D3142] text-white h-12 rounded-xl pr-10"
                                type={isVisible ? "text" : "password"}
                                placeholder='Enter Your Password'
                            />
                            {/* Password Toggle Button without InputGroup */}
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
                    
                    {/* Submit Button */}
                    <div className="w-full mt-2">
                        <Button 
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity" 
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-[#2D3142]"></div>
                        <span className="mx-4 text-gray-500 text-sm font-medium">or</span>
                        <div className="flex-grow border-t border-[#2D3142]"></div>
                    </div>
                    
                </Form>
            </div>
        </div>
    );
};


export default SignUpPage;