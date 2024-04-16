import { NextResponse,NextRequest } from "next/server";
import prisma from "@/app/(lib)/prisma";
import { Ticket, Workflow,WorkflowStep } from "@prisma/client";


export async function POST(req:NextRequest) {
    
    if(req.method === 'POST') {
        try {
            const ticket: Ticket = await req.json();
            const workflow: Workflow = await prisma.workflow.findFirst({
                include: {
                    steps: true,
                },
                where: {
                    title: 'default',
                }
            });
            
            ticket.workflowId = workflow.id;
            ticket.statusId = workflow.steps.find((step:WorkflowStep) => step.order === 1).statusId;
            
            const response = await prisma.ticket.create({
                data: ticket
            });
    
            return NextResponse.json({message: "Ticket Created"}, { status: 200 });
        } catch(error) {
            console.log(error);
            
            return NextResponse.json({message: "Internal Server Error",error}, {status: 500});
        }
    } else {
        return NextResponse.json({message: "Method Not Allowed"}, {status: 405});
    }
}

export async function GET(req:NextRequest) {
    if(req.method === 'GET')
    {
        try {
            const response = await prisma.ticket.findMany({
                include: {
                    status: true,
                    priority: true,
                    category: true
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