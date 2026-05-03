'use client'

import { authClient } from '@/lib/auth-client';
import { Check, ClockFill, Eye, EyeSlash } from '@gravity-ui/icons';
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from '@heroui/react';
import { useState } from 'react';


const SignInPage = () => {
    const [isVisible, setIsVisible] = useState(false);
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
        })
        console.log("Signup Success:", data);
        console.log("Signup Error:", error);
        if (error) {
            alert("Error sign In " + error.message)
        }
        if (data) {
            alert('sign In sucessfully' + data.message)
        }

    }

    return (
        <div className="min-h-screen  bg-gradient-to-r to-[#031a24] from-[#0f0027] text-white py-10 ">

            <div className="w-6/12  mx-auto border  rounded-2xl ">
                <Form
                    className="flex p-5  flex-col gap-4"
                    render={(props) => <form {...props} data-custom="foo" />}
                    onSubmit={onSubmit}
                >
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
                    <div className="flex gap-2">
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white" type="submit">
                            <Check />
                            Submit
                        </Button>

                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SignInPage;