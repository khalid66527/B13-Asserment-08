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
        <div className="min-h-screen bg-gradient-to-r to-[#031a24] from-[#0f0027] text-white py-10  ">
            <div className="w-6/12  mx-auto border  rounded-2xl ">

                <Form
                    className="flex  flex-col  p-5 gap-4"
                    render={(props) => <form {...props} data-custom="foo" />}
                    onSubmit={onSubmit}
                >
                    <TextField
                        isRequired
                        validate={(value) => {
                            if (value.length < 3) {
                                return "Name must be at least 3 characters";
                            }
                            return null;
                        }}
                    >
                        <Label>Name</Label>
                        <Input name="name" placeholder="Enter Your Name" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        validate={(value) => {
                            // URL বা Base64 লিংক ভ্যালিডেশন
                            if (!value || value.length < 10) {
                                return "Please enter a valid Image URL or Base64 link";
                            }
                            return null;
                        }}
                    >
                        <Label>Profile Image URL</Label>
                        <Input
                            name="image"
                            type="url"
                            placeholder="Enter Image Link (http:// or data:image/...)"
                        />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired

                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input name="email" placeholder="Enter Your Email" />
                        <FieldError />
                    </TextField>
                    <TextField className="w-full max-w-[280px]" name="password">
                        <Label>Password</Label>
                        <InputGroup>
                            <InputGroup.Input
                                className="w-full max-w-[280px]"
                                type={isVisible ? "text" : "password"}
                                placeholder='Enter Your Password'
                            />
                            <InputGroup.Suffix className="pr-0">
                                <Button
                                    isIconOnly
                                    aria-label={isVisible ? "Hide password" : "Show password"}
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => setIsVisible(!isVisible)}
                                >
                                    {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                                </Button>
                            </InputGroup.Suffix>
                        </InputGroup>
                    </TextField>
                    <p className="text-right">
                        <span className="text-blue-500 cursor-pointer hover:underline">
                            Forgot Password?
                        </span>
                    </p>
                    <div className="w-full">
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white " type="submit">
                            <Check />
                            Sign Up
                        </Button>

                    </div>
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-600"></div>
                        <span className="mx-3 text-gray-400 text-sm">or</span>
                        <div className="flex-grow border-t border-gray-600"></div>
                    </div>
                </Form>
            </div>
        </div>
    );
};


export default SignUpPage;