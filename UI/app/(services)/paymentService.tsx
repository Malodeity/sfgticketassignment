import { MakePaymentRequest } from "./requestObjects/makePaymentRequest";


const URL = `${process.env.API_URL}/payment/MakePayment`;

export const makePayment = async (makePayment: MakePaymentRequest) => {
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(makePayment)
    });

    return await response.json();
}