
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/(lib)/prisma";

export async function GET(req:NextRequest) {
    if(req.method === 'GET')
    {
        try {
            const response = await prisma.category.findMany();
            return NextResponse.json({response}, { status: 200 });
        }
        catch( error ) {
            return NextResponse.json({ message: "Error getting tickets", error }, { status: 500 });
        }
        
    } else {
        return NextResponse.json( {message: "Method Not Allowed"}, { status: 405});
    }
}