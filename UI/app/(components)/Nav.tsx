import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
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
            {session == null ? (<Link href="/sign-in">Login</Link>) : (<><div className="flex items-center space-x-4">
                <Link href="/">
                    <FontAwesomeIcon icon={faHome} className="icon" /> Home
                </Link>
                <Link href="/TicketPage/new">
                    <FontAwesomeIcon icon={faTicket} className="icon" /> New Ticket
                </Link>
            </div>
                <div>
                    <Avatar email={session?.user?.email as string} />
                </div></>)}
        </nav>
    );
}

export default Nav