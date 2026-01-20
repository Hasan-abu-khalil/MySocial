import React from "react";
import Slider from "react-slick";

export default function Stories({ stories }) {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
    };

    return (
        <div className="bg-white p-2 rounded shadow mb-4">
            <Slider {...settings}>
                {stories.map((story) => (
                    <div key={story.id} className="px-1">
                        <img
                            src={`/storage/${story.media_path}`}
                            className="w-16 h-16 rounded-full border-2 border-pink-500 object-cover"
                        />
                        <p className="text-xs text-center mt-1">{story.user.name}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
