import TicketCard from "./(components)/TicketCard";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { getMyViolations } from "./(services)/violationService";

const Dashboard = async () => {
  //const tickets = await getMyViolations("1");
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