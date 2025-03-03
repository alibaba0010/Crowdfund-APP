"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CustomButton, ProfileDropDown, WalletConnect } from ".";
import { logo, menu, search } from "../assets";
import { navlinks } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { toggleWalletConnect } from "../actions/wallet";

const Navbar = ({ hasAccess }: { hasAccess: boolean }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
  console.log("Address: " + address);
  const { isWalletConnectOpen } = useSelector((state: any) => state.wallet);
  const setSearchButton = useSelector(
    (state: any) => state.campaigns.setSearchButton
  );
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Initialize search query from URL
  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
  }, [searchParams]); //Fixed dependency

  // Reset search button when not on campaign pages
  useEffect(() => {
    const path = location.pathname;
    if (!path.includes("campaign") && !path.includes("/campains/*")) {
      dispatch({ type: "campaigns/setSearchButtonState", payload: false });
    }
  }, [location.pathname, dispatch]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }
    setSearchQuery("");
    navigate({ search: params.toString() });
  };

  const ProjectTitle = () => (
    <h1 className="font-epilogue font-bold text-[24px] text-white">
      Crowdfunding Platform
    </h1>
  );

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      {/* Left Section: Search Bar or Project Title */}
      <div className="lg:flex-1 flex flex-row items-center justify-between">
        {setSearchButton ? (
          <>
            <div className="flex flex-row items-center">
              <div className="mr-4">
                <ProjectTitle />
              </div>
              <div className="flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
                <input
                  type="text"
                  placeholder="Search for campaigns"
                  className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <div
                  className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer"
                  onClick={handleSearch}
                >
                  <img
                    src={search || "/placeholder.svg"}
                    alt="search"
                    className="w-[15px] h-[15px] object-contain"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <ProjectTitle />
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden flex-row justify-end items-center gap-4">
        <CustomButton
          btnType="button"
          title={address && hasAccess ? "Create a campaign" : "Connect Wallet"}
          styles={address && hasAccess ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address && hasAccess) {
              navigate("create-campaign");
            } else {
              dispatch(toggleWalletConnect());
            }
          }}
        />
        <ProfileDropDown />
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo || "/placeholder.svg"}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu || "/placeholder.svg"}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        {/* Mobile Drawer */}
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && "bg-[#3a3a43]"}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl || "/placeholder.svg"}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? "filter-none" : "grayscale"}`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Wallet Connect Modal */}
      {isWalletConnectOpen && <WalletConnect />}
    </div>
  );
};

export default Navbar;
