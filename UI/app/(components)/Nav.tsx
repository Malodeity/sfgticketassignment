import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import { options } from '@/app/api/auth/[...nextauth]/options';
import Link from "next/link";
import { Avatar } from "./Avatar";

const getUserEmail = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/Users/${id}`, {
            method: 'GET',
            headers: {},
            cache: 'no-store'
        });
        const user = await res.json();
        return user;
    } catch (error) {
        console.error(error)
    }
}

const Nav = async () => {
    const session = await getServerSession(options);

    return (
        <nav className="flex justify-between bg-nav p-4">
            <div className="flex items-center space-x-4">
                <Link href="/">
                    <FontAwesomeIcon icon={faHome} className="icon" /> Home
                </Link>
                <Link href="/TicketPage/new">
                    <FontAwesomeIcon icon={faTicket} className="icon" /> New Ticket
                </Link>
            </div>
            <div>
                {session?.user?.email !== null ? (<Avatar email={session?.user?.email as string} />) :
                    (<Link href="/signin">Login</Link>)
                }
            </div>
        </nav>
    );
}

export default Nav