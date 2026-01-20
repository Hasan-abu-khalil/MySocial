import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function StoriesFeed() {
    const { stories, authUser } = usePage().props;
    const [activeIndex, setActiveIndex] = useState(null);

    const openStory = (index) => {
        setActiveIndex(index);
        markStoryViewed(stories[index].id);
    };

    const markStoryViewed = (storyId) => {
        router.post(`/stories/${storyId}/view`, {}, { preserveScroll: true });
    };

    useEffect(() => {
        if (activeIndex === null) return;

        const timer = setTimeout(() => {
            if (activeIndex < stories.length - 1) {
                setActiveIndex(activeIndex + 1);
                markStoryViewed(stories[activeIndex + 1].id);
            } else {
                setActiveIndex(null);
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [activeIndex, stories]);

    const nextStory = () => {
        if (activeIndex < stories.length - 1) {
            setActiveIndex(activeIndex + 1);
            markStoryViewed(stories[activeIndex + 1].id);
        } else {
            setActiveIndex(null);
        }
    };

    const prevStory = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
            markStoryViewed(stories[activeIndex - 1].id);
        }
    };

    const closeStory = () => setActiveIndex(null);

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto mt-20">
                {/* عرض كل القصص كبروفايلات صغيرة */}
                <div className="flex space-x-4 overflow-x-auto pb-4">
                    {stories.map((story, index) => {
                        const viewed = story.views.some(v => v.user_id === authUser.id);
                        return (
                            <div
                                key={story.id}
                                className="w-24 flex-shrink-0 cursor-pointer"
                                onClick={() => openStory(index)}
                            >
                                <img
                                    src={`/storage/${story.media_path}`}
                                    alt={story.user.name}
                                    className={`w-24 h-24 rounded-full object-cover border-2 ${viewed ? 'border-gray-400' : 'border-blue-500'}`}
                                />
                                <p className="text-center text-sm mt-1">{story.user.name}</p>
                            </div>
                        );
                    })}
                </div>

                {/* عرض القصة النشطة */}
                {activeIndex !== null && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 group">
                        {stories[activeIndex].type === "image" ? (
                            <img src={`/storage/${stories[activeIndex].media_path}`} className="max-h-full max-w-full rounded" />
                        ) : (
                            <video src={`/storage/${stories[activeIndex].media_path}`} autoPlay className="max-h-full max-w-full rounded" />
                        )}
                        <p className="text-white mt-4 absolute bottom-10">{stories[activeIndex].user.name}</p>

                        {/* زر الإغلاق */}
                        <button
                            onClick={closeStory}
                            className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-1 rounded z-50"
                        >
                            ✕
                        </button>

                        {/* أزرار التقدم والعودة في منتصف الشاشة */}
                        <div className="absolute inset-0 flex">
                            {/* العودة */}
                            <div
                                onClick={prevStory}
                                className="flex-1 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200"
                            ></div>

                            {/* التقدم */}
                            <div
                                onClick={nextStory}
                                className="flex-1 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200"
                            ></div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
