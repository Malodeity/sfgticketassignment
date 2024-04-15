'use client';
import { signOut } from "next-auth/react";
import { useState } from "react";

export const Avatar = ({ email }: { email: string }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="text-default-text" onClick={() => setIsVisible(!isVisible)}>
            {email}
            {isVisible && (<div onClick={() => signOut()}>
                Sign Out
            </div>)}
        </div>
    );
}
{/*<div className="text-default-text">{session?.user?.email}</div>*/ }