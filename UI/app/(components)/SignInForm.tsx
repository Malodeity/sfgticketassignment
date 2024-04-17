'use client'

import { useState } from "react";
import { useSession } from "../(providers)/SessionProvider";

export const SignInForm = () => {
    const { signIn } = useSession();
    let startingFormData = {
        username: '',
        password: ''
    };

    const [formData, setFormData] = useState(startingFormData);

    const handleChange = (e) => {

        const value = typeof e.target.valueAsNumber === 'number' && !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSubmit = async (e) => {
        try {
            const response = /*await signIn('credentials', {
                username: formData.username,
                password: formData.password,
                redirect: true,
            });

            if (!response.ok) {

            }*/ await signIn({ email: formData.username, password: formData.password });
        }
        catch (e) {

        }
    }

    return (
        <form className="space-y-8 w-full" method="post" onSubmit={onSubmit}>
            <div>
                <h1 className="text-nav">Sign In</h1>
                <div className="flex justify-between">
                    <label className="text-nav">Username</label>
                    <input
                        id='username'
                        name='username'
                        type='text'
                        onChange={handleChange}
                        required={true}
                        value={formData.username}
                    />
                </div>
                <div className="flex justify-between">
                    <label className="text-nav">Password</label>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        onChange={handleChange}
                        required={true}
                        value={formData.password}
                    />
                </div>
            </div>
            <input type='submit' className='btn' value="Login" />
        </form>
    )
}