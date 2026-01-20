import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, usePage } from "@inertiajs/react";

export default function PublicProfile({ profileUser, posts, canSeePosts }) {
    const authUser = usePage().props.auth.user;
    const isFollowing = profileUser.is_followed_by_auth;

    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto mt-10">
                <div className="flex gap-10 items-center">
                    <img
                        src={
                            profileUser.avatar
                                ? `/storage/${profileUser.avatar}`
                                : "/img/profile-icon-design-free-vector.jpg"
                        }
                        className="w-32 h-32 rounded-full object-cover"
                    />

                    <div>
                        <h2 className="text-2xl font-bold">
                            {profileUser.name}
                        </h2>

                        <div className="flex gap-6 mt-4">
                            <span>
                                <b>{profileUser.posts_count ?? 0}</b> posts
                            </span>
                            <span>
                                <b>{profileUser.followers_count ?? 0}</b>{" "}
                                followers
                            </span>
                            <span>
                                <b>{profileUser.following_count ?? 0}</b>{" "}
                                following
                            </span>
                        </div>

                        <p className="mt-2 text-gray-700">
                            {profileUser.bio || "No bio yet."}
                        </p>

                        {/* FOLLOW BUTTON */}
                        {authUser.id !== profileUser.id && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    router.post(
                                        route("users.follow", profileUser.id),
                                    );
                                }}
                                className="mt-3"
                            >
                                <button
                                    className={`px-4 py-1 rounded text-sm ${
                                        isFollowing
                                            ? "bg-gray-300"
                                            : "bg-blue-500 text-white"
                                    }`}
                                >
                                    {isFollowing ? "Following" : "Follow"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <hr className="my-8" />

                {!canSeePosts && (
                    <p className="text-center text-gray-500">
                        This account is private
                    </p>
                )}

                {canSeePosts && (
                    <div className="grid grid-cols-3 gap-2">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <img
                                    key={post.id}
                                    src={
                                        post.media[0]?.path
                                            ? `/storage/${post.media[0].path}`
                                            : defaultAvatar
                                    }
                                    className="aspect-square object-cover"
                                    alt="Post"
                                />
                            ))
                        ) : (
                            <p className="text-center col-span-3 text-gray-500">
                                No posts yet.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
