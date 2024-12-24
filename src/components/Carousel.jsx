import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { assets } from "../assets";
import { ReviewCard } from ".";
import { DotButton, useDotButton } from "./CarouselDotButton";

export const reviews = [
  {
    id: 1,
    pic: assets.reviewer7,
    name: "Jigyasa Acharya",
    role: "Quality Analyst",
    reveiwMsg:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid accusantium molestiae quisquam nam nihil soluta voluptatem aspernatur neque sit numquam?",
    rating: 5,
  },
  {
    id: 2,
    pic: assets.reviewer1,
    name: "Nirjala Sapkota",
    role: "UI Designer",
    reveiwMsg:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid accusantium molestiae quisquam nam nihil soluta voluptatem aspernatur neque sit numquam?",
    rating: 4,
  },

  {
    id: 3,
    pic: assets.reviewer9,
    name: "Prakriti Poudel",
    role: "Frontend Engineer",
    reveiwMsg:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid accusantium molestiae quisquam nam nihil soluta voluptatem aspernatur neque sit numquam?",
    rating: 3,
  },
  ,
  {
    id: 4,
    pic: assets.reviewer4,
    name: "Akash Manandar",
    role: "Backend Engineer",
    reveiwMsg:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid accusantium molestiae quisquam nam nihil soluta voluptatem aspernatur neque sit numquam?",
    rating: 4,
  },
  {
    id: 5,
    pic: assets.reviewer8,
    name: "Gunjayesh Shrestha",
    role: "UI Designer",
    reveiwMsg:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid accusantium molestiae quisquam nam nihil soluta voluptatem aspernatur neque sit numquam?",
    rating: 2,
  },
  {
    id: 6,
    pic: assets.reviewer6,
    name: "Jiya Joshi",
    role: "ML Engineer",
    reveiwMsg:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid accusantium molestiae quisquam nam nihil soluta voluptatem aspernatur neque sit numquam?",
    rating: 4,
  },
];

const Carousel = () => {
  const options = {
    loop: true,
    slidesToScroll: 1,
    align: "start",
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { onDotButtonClick } = useDotButton(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect); // Ensure reInit handles snaps

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {reviews.map((review) => (
            <div className="embla__slide" key={review.id}>
              <ReviewCard {...review} />
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`embla__dot ${
                index === selectedIndex ? "embla__dot--selected" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
