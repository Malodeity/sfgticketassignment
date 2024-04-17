import { LoginRequest } from "./requestObjects/loginRequest";
import axios from "axios";

const URL = `${process.env.API_URL}/login/Login`;

export const login = async (loginRequest: LoginRequest): Promise<any> => {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'next-action': 'login'
        },
        body: JSON.stringify(loginRequest)
    });

    return await response.json();
}