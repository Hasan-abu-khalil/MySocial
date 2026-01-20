import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function CreateStory() {
    const [media, setMedia] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const file = e.target.files[0];
        setMedia(file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!media) return;

        const formData = new FormData();
        formData.append('media', media);

        Inertia.post('/stories', formData, {
            onSuccess: () => {
                setMedia(null);
                setPreview(null);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4">
                <input type="file" accept="image/*,video/*" onChange={handleChange} required />
                {preview && (
                    media.type.startsWith('image') ? 
                        <img src={preview} className="w-full rounded mt-2" /> : 
                        <video src={preview} controls className="w-full rounded mt-2" />
                )}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">رفع القصة</button>
            </form>
        </AuthenticatedLayout>
    );
}
