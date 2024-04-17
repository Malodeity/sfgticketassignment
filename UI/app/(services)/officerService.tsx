import { CreateTicketRequest } from "./requestObjects/createTicketRequest";

const URL = `${process.env.API_URL}/tickets/createTicket`;

export const createTicket = async (createTicket: CreateTicketRequest) => {
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(createTicket)
    });

    return await response.json();
}