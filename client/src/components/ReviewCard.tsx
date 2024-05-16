import React from "react";

interface ReviewCardProps {
  name: string;
  imageSrc: string;
  description: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  imageSrc,
  description,
}) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <div className="inline-block relative">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <img
              className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover"
              src={imageSrc}
              alt="Profile picture"
            />
            <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
          </div>
          <svg
            className="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z" />
          </svg>
        </div>
      </div>
      <div className="ml-6 ">
        <p className="flex items-baseline">
          <span className="text-gray-600 font-bold">{name}</span>
          <span className="ml-2 text-green-600 text-xs">Apprenant Verifié</span>
        </p>
        <div className="mt-1">{description}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
