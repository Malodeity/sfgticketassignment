import { NextResponse,NextRequest } from "next/server";
import prisma from "@/app/(lib)/prisma";

export async function GET(req:NextRequest, { params}) {
    if(req.method === 'GET')
    {
        try {
            const { id } = params;
            const response = await prisma.user.findUnique({
                where : {
                    email : id
                }
            });
            return NextResponse.json({response}, { status: 200 });
        }
        catch( error ) {
            return NextResponse.json({ message: "Error getting tickets", error }, { status: 500 });
        }
        
    } else {
        return NextResponse.json( {message: "Method Not Allowed"}, { status: 405});
    }
}