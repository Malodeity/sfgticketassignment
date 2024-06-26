import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SignInForm } from "../(components)/SignInForm";
import { options } from "../api/auth/[...nextauth]/options";

const SignInPage = async () => {
    const session = await getServerSession(options);

    if (session?.user?.email) {
        redirect('/');
    }

    return (
        <section className="bg-ct-blue-600 min-h-screen pt-20 min-w-full">
            <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
                <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
                    <SignInForm />
                </div>
            </div>
        </section>
    );
}

export default SignInPage