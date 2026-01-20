import { Link, usePage } from "@inertiajs/react";
import { Home, PlusSquare } from "lucide-react";

export default function Navbar() {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <nav className="bg-white border-b fixed top-0 w-full z-50">
            <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
                {/* Logo */}
                <Link href={route("feed")} className="font-bold text-xl">
                    MySocial
                </Link>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search"
                    className="hidden md:block bg-gray-100 px-4 py-1 rounded-lg text-sm w-64"
                />

                {/* Icons / Profile */}
                <div className="flex items-center space-x-5">
                    {/* Feed */}
                    <Link href={route("feed")}>
                        <Home className="w-6 h-6" />
                    </Link>

                    {/* Add Post */}
                    <Link href={route("posts.create")}>
                        <PlusSquare className="w-6 h-6" />
                    </Link>

                    {/* Profile */}
                    <Link href={route("profile.public", { name: user.name })}>
                        <img
                            src={
                                user.avatar
                                    ? `/storage/${user.avatar}`
                                    : "/img/profile-icon-design-free-vector.jpg"
                            }
                            alt={user.name}
                            className="w-7 h-7 rounded-full object-cover"
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
