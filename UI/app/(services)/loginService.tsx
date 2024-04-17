import { LoginRequest } from "./requestObjects/loginRequest";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/login/Login`;

export const login = async (loginRequest: LoginRequest): Promise<any> => {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginRequest)
    });

    return await response.json();
}