import React from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Feed() {
    const { posts } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto space-y-4">
                {posts.length===0 && <p className="text-center text-gray-500">لا يوجد منشورات</p>}

                {posts.map(post => (
                    <div key={post.id} className="p-4 bg-white rounded shadow">
                        <p className="font-bold">{post.user.name}</p>
                        <p className="text-gray-700 mt-2">{post.content}</p>

                        {/* عرض الصور والفيديوهات */}
                        {post.media.length>0 && post.media.map(m =>
                            m.type==="image"?<img key={m.id} src={`/storage/${m.path}`} className="w-full rounded my-2"/>:<video key={m.id} src={`/storage/${m.path}`} controls className="w-full rounded my-2"/>
                        )}

                        <button onClick={()=>router.post(`/posts/${post.id}/like`)} className="mt-2 text-blue-500">
                            👍 Like ({post.likes.length})
                        </button>

                        <div className="mt-2 space-y-1">
                            {post.comments.map(c => (
                                <p key={c.id} className="text-gray-600">
                                    <span className="font-bold">{c.user.name}:</span> {c.content}
                                </p>
                            ))}
                        </div>

                        <form onSubmit={(e)=>{e.preventDefault(); router.post(`/posts/${post.id}/comments`,{content:e.target.comment.value}); e.target.reset();}} className="mt-2">
                            <input type="text" name="comment" placeholder="أضف تعليقًا..." className="w-full border rounded p-2" required/>
                        </form>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
