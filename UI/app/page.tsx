import { Category, Ticket } from "@prisma/client";
import TicketCard from "./(components)/TicketCard";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const getTickets = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/Tickets', {
      method: 'GET',
      headers: {

      },
      cache: "no-store",
    });

    if (!res.ok) {
      const error = await res.json();

      throw new Error('Failed to get Ticket.', error)
    }

    const tickets = await res.json();
    return tickets.response;

  } catch (error) {
    console.error('Failed to get tickets', error);
  }
}


const Dashboard = async () => {
  const tickets = await getTickets();
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect('/SignInPage');
  }

  const categories: Category[] = [
    ...new Set(tickets?.map((ticket: Ticket) => ticket.category))
  ]

  const uniqueCategories = () => {
    const uniqueCategories = [];
    const uniqueCategoriesSet = new Set();

    for (const category of categories) {
      const key = `${category.id}-${category.description}`
      if (!uniqueCategoriesSet.has(key)) {
        uniqueCategoriesSet.add(key);
        uniqueCategories.push(category);
      }
    }
    return uniqueCategories;
  }


  return (
    <div className="p-5">
      <div>
        {tickets && uniqueCategories()?.map((uniqueCategory: Category) => (
          <div key={uniqueCategory.id} className="mb-4">
            <h2>{uniqueCategory.description}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {tickets.filter((ticket: Ticket) => ticket.categoryId === uniqueCategory.id).map((filteredTicket: Ticket, _index: number) => (
                <TicketCard key={_index} ticket={filteredTicket} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="lg:grid grid-cols-2 xl:grid-cols-4">
      </div>
    </div>
  );
};

export default Dashboard;