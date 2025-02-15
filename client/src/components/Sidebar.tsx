import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, sun } from "../assets";
import { navlinks } from "../constants";

interface IconProps {
  styles?: string;
  name?: string;
  imgUrl?: string;
  isActive?: string;
  disabled?: boolean;
  handleClick?: () => void;
}

const Icon = ({
  styles,
  name,
  imgUrl,
  isActive,
  disabled,
  handleClick,
}: IconProps) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${!disabled && "cursor-pointer"} ${styles} group relative`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img
        src={imgUrl || "/placeholder.svg"}
        alt="fund_logo"
        className="w-1/2 h-1/2"
      />
    ) : (
      <img
        src={imgUrl || "/placeholder.svg"}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
    {name && (
      <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {name}
      </span>
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon
          styles="w-[52px] h-[52px] bg-[#2c2f32]"
          imgUrl={logo}
          name="Home"
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-6">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon
          styles="bg-[#1c1c24] shadow-secondary"
          imgUrl={sun}
          name="Theme"
        />
      </div>
    </div>
  );
};

export default Sidebar;
