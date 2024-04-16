import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/app/(lib)/prisma";
import { Ticket } from '@prisma/client';

export async function GET(req:NextRequest,{ params }) {
    if(req.method === 'GET') {
        try {

            const { id } = params;
            const response = await prisma.ticket.findUnique({
                where: {
                    id: id
                }
            });
            return NextResponse.json(response,{ status: 200 });
        } catch(error) {
            return NextResponse.json({ message: "Error",error},{ status: 500});
        }
    } else {
        return NextResponse.json({message:'Method Not Allowed'},{ status: 405 });
    }
}

export async function DELETE(req:NextRequest,{ params }) {
    if(req.method === 'DELETE') {
        try {
            const { id } = params;
            const response = await prisma.ticket.delete({
                where: {
                    id: id
                },
            });
            return NextResponse.json({message: "Ticket Deleted"}, { status: 200 });
        } catch(error) {
            return NextResponse.json({ message: "Internal Server Error",error},{ status: 500});
        }
    } else {
        return NextResponse.json( {message: "Method Not Allowed"}, { status: 405});
    }
}

export async function PUT(req:NextRequest,{ params }) {
    if(req.method === 'PUT') {
        try {
            const { id } = params;
            
            const data:Ticket = await req.json();
            
            const response = await prisma.ticket.update({
                where: {
                    id: id
                },
                data: {
                    title : data.title,
                    description : data.description,
                    progress : data.progress,
                    priorityId : data.priorityId,
                    updatedBy : data.updatedBy,
                    categoryId : data.categoryId,
                    statusId : data.statusId
                }
            });

            return NextResponse.json({ message: `Ticket ${id} Update`},{ status: 200});
        } catch(error) {
            return NextResponse.json({ message: "Internal Server Error",error},{ status: 500});
        }
    } else {
        return NextResponse.json( { message: "Method Not Allowed"}, { status:405 })
    }
}