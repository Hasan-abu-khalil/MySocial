import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
    const { posts, authUser } = usePage().props;

    const handleLike = (postId) => {
        Inertia.post(`/posts/${postId}/like`);
    };

    const handleComment = (e, postId) => {
        e.preventDefault();
        const content = e.target.comment.value;
        Inertia.post(`/posts/${postId}/comments`, { content });
        e.target.reset();
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto space-y-4">
                {posts.map((post) => (
                    <div key={post.id} className="p-4 bg-white rounded shadow">
                        {/* بيانات المستخدم */}
                        <p className="font-bold">{post.user.name}</p>
                        {post.media.length > 0 && (
                            <div className="my-2 space-y-2">
                                {post.media.map((m) => (
                                    m.type === "image" ? (
                                        <img key={m.id} src={`/storage/${m.path}`} className="w-full rounded" />
                                    ) : (
                                        <video key={m.id} src={`/storage/${m.path}`} controls className="w-full rounded" />
                                    )
                                ))}
                            </div>
                        )}
                        <p className="text-gray-700">{post.content}</p>

                        {/* زر الإعجاب */}
                        <button
                            onClick={() => handleLike(post.id)}
                            className="mt-2 text-blue-500 font-semibold"
                        >
                            👍 Like ({post.likes.length})
                        </button>

                        {/* التعليقات */}
                        <div className="mt-2 space-y-1">
                            {post.comments.map((c) => (
                                <p key={c.id} className="text-gray-600">
                                    <span className="font-bold">{c.user.name}:</span> {c.content}
                                </p>
                            ))}
                        </div>

                        {/* إضافة تعليق */}
                        <form onSubmit={(e) => handleComment(e, post.id)} className="mt-2">
                            <input
                                type="text"
                                name="comment"
                                placeholder="أضف تعليقًا..."
                                className="w-full border rounded p-2"
                                required
                            />
                        </form>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
