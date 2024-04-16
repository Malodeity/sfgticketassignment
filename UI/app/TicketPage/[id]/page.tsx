import TicketForm from "@/app/(components)/TicketForm";
import { Priority } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const getTicketById = async (id:string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/Tickets/${id}`,{
            method: 'GET',
            headers: {},
            cache: 'no-store'
        });
        const ticket = await res.json();
        return ticket;
    } catch(error) {
        console.error(error)
    }
}

const getCategories = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/Categories',{
          method: 'GET',
          headers: {},
        });
        if(!res.ok) {
          throw new Error('Failed to get Categories.')
        }
        const categories = await res.json();
        return categories.response;
      } catch(error) {
        console.error('Failed to get categories',error);
      }
  }
  
  const getPriorities = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/Priorities',{
          method: 'GET',
          headers: {},
        });
        if(!res.ok) {
          throw new Error('Failed to get Priorities.')
        }
        const priorities = await res.json();
        return priorities.response;
      } catch(error) {
        console.error('Failed to get priorities',error);
      }
  }
  
  const getStatues = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/Statuses',{
          method: 'GET',
          headers: {},
        });
        if(!res.ok) {
          throw new Error('Failed to get Statuses.')
        }
        const statuses = await res.json();
        return statuses.response;
      } catch(error) {
        console.error('Failed to get statuses',error);
      }
  }

const TicketPage = async ({ params }) => {
  const session = await getServerSession(options);
  if(!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
    const categories = await getCategories();
    const priorities = await getPriorities();
    const statues = await getStatues();

    const handleSort = (priorities:Priority[]) => {
        const sortedData = [...priorities].sort((a,b) => {
            return a.level > b.level ? 1 : -1
        });
        return sortedData;
    }
    
    const EDITMODE = params.id === 'new' ? false : true;
    let updateTicketData = {};
    if(EDITMODE){
        updateTicketData = await getTicketById(params.id);
        
    } else {
        updateTicketData = {
            id: 'new',
        };
    }
    return (
        <TicketForm ticket={updateTicketData} categories={categories} priorities={handleSort(priorities)} statuses={statues}/>
    );
};

export default TicketPage;