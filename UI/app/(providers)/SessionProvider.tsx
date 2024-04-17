'use client'

import { verify } from "jsonwebtoken";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { User } from "../(models)/User";

const SessionContext = createContext<{ sessionToken: { token: string, expirationTime: number, user: User | null }, status: string | 'authenticated' | 'unauthenticated', signIn: ({ email, password }: { email: string, password: string }) => Promise<void>, signOut: () => Promise<void>, signUp: ({ name, surname, email, password }: { name: string, surname: string, email: string, password: string }) => Promise<void> }>(
    {
        sessionToken: {
            token: '',
            expirationTime: 0,
            user: null
        },
        status: 'unauthenticated',
        signIn: async () => { },
        signOut: async () => { },
        signUp: async () => { }
    });

export const useSession = () => {
    return useContext(SessionContext);
}

const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [sessionToken, setSessionToken] = useState({ token: '', expirationTime: 0, user: null });
    const [user, setUser] = useState(null)
    const [status, setStatus] = useState('unauthenticated');

    useEffect(() => {
        const generateSessionToken = () => {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 3);
            const expirationTime = expirationDate.getTime();
            const token = 'Your_Session_Token';

            setSessionToken({
                token,
                expirationTime,
                user
            });
        };

        generateSessionToken();
    }, []);

    const signIn = async ({ email, password }: { email: string, password: string }) => {
        const body = {
            username: email,
            password
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const myToken = response.headers.get('Auth_token') as string;

        verify(myToken, 'P3yjkNHTchTtsq8bgu2/mviIYRrdzpvkI/GrR9vIESw=', (err, decoded) => {
            if (err) {
                console.error('JWT verification failed:', err);
                // Handle invalid tokens here
                throw Error('Invalid token');
            } else {
                console.log('Decoded JWT payload:', decoded);
                // Token is valid, use decoded data as needed
                const parsedObject = JSON.parse(JSON.stringify(decoded));
                setSessionToken({ token: myToken, expirationTime: parsedObject.exp, user: parsedObject });
                setStatus('authenticated');

            }
        });
    };

    const signOut = async () => {
        setSessionToken({ token: '', expirationTime: 0, user: null });
        setUser(null);
        setStatus('unauthenticated');
    };

    const signUp = async ({ name, surname, email, password }: { name: string, surname: string, email: string, password: string }) => {
        const body = {
            email,
            name,
            surname,
            password
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const myToken = response.headers.get('auth_token') as string;
        const user = await response.json();
        setSessionToken({ token: myToken, expirationTime: sessionToken.expirationTime, user });
        setStatus('authenticated')
    }

    return (
        <SessionContext.Provider value={{ sessionToken, status, signIn, signOut, signUp }}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionProvider;