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
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect('/sign-in');
  }

  return (
    <div className="p-5">
      <div>
      </div>
      <div className="lg:grid grid-cols-2 xl:grid-cols-4">
      </div>
    </div>
  );
};

export default Dashboard;