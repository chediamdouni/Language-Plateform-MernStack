import React from "react";

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
}

const HomeCard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <div
      className="px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer bg-purple-500"
      onClick={handleClick}
    > 
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <img src={img} alt="meeting" width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h2 className="text-lg font-normal">{description}</h2>
      </div>
    </div>
  );
};

export default HomeCard;
