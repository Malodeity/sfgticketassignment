import { AddToAnnualTaxRequest } from "./requestObjects/addToAnnualTaxRequest";

const URL = `${process.env.API_URL}/violations`;

export const getOfficerViolations = async (id: string) => {
    const response = await fetch(`${URL}/getOfficerViolations?id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await response.json();
}

export const getMyViolations = async (id: string) => {
    const response = await fetch(`${URL}/getMyViolations?id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await response.json();
}

export const AddToAnnualTax = async (addToAnnualTax: AddToAnnualTaxRequest) => {
    const response = await fetch(`${URL}/addToAnnualTax`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(addToAnnualTax)
    });

    return await response.json();
}