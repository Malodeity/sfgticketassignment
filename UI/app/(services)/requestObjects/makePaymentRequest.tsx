export interface MakePaymentRequest {
    cardNumber: string;
    cardName: string;
    securityCode: string;
    expiryDate: Date;
    fineAmount: number;
    violationId: string;
}