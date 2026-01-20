import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
    const [media, setMedia] = useState([]);
    const [preview, setPreview] = useState([]);

    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        setMedia(files);

        const previews = files.map(file => {
            if(file.type.startsWith("image")) return {type:"image", url:URL.createObjectURL(file)};
            if(file.type.startsWith("video")) return {type:"video", url:URL.createObjectURL(file)};
            return null;
        }).filter(Boolean);
        setPreview(previews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        media.forEach(file => formData.append("media[]", file));

        Inertia.post("/posts", formData, {
            onSuccess: () => { e.target.reset(); setMedia([]); setPreview([]); }
        });
    };

    return (
        <AuthenticatedLayout>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4">
                <textarea name="content" placeholder="اكتب شيئًا..." className="w-full border p-2 rounded" />
                <input type="file" multiple accept="image/*,video/*" onChange={handleMediaChange} />
                <div className="grid grid-cols-2 gap-2 mt-2">
                    {preview.map((p,idx) => p.type==="image"?<img key={idx} src={p.url} className="w-full rounded"/>:<video key={idx} src={p.url} controls className="w-full rounded"/>)}
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">نشر</button>
            </form>
        </AuthenticatedLayout>
    );
}
