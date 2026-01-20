import React from "react";
import { Inertia } from "@inertiajs/inertia";

export default function FollowButton({ user, authUser }) {
    if (user.id === authUser.id) return null;

    const handleFollow = () => {
        Inertia.post(`/users/${user.id}/follow`);
    };

    return (
        <button
            onClick={handleFollow}
            className="text-blue-500 font-semibold border px-2 py-1 rounded"
        >
            {user.is_following ? "Unfollow" : "Follow"}
        </button>
    );
}
