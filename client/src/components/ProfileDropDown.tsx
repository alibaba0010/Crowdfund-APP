import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import { logo } from "../assets";
import { useDisconnect } from "wagmi";
import { Link } from "react-router-dom";
import { useBalance } from "wagmi";
import { formatEther } from "viem";
import { useEffect, useState } from "react";

const { Text } = Typography;

const ProfileDropDown = () => {
  const { disconnect } = useDisconnect();
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
  const [balance, setBalance] = useState("");
  const { data } = useBalance({ address });
  const disconnectHandler = () => {
    disconnect();
    window.location.reload();
  };
  useEffect(() => {
    if (data) setBalance(formatEther(data.value));
  }, [data]);

  return (
    <div className="flex items-center gap-4">
      {address && (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="w-8 h-8 sm:w-10 sm:h-10 transition-transform hover:scale-105 bg-[#2c2f32] p-1.5"
              src={logo}
              alt="Profile"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            className="bg-[#1c1c24] min-w-[200px] p-0 rounded-xl shadow-xl"
          >
            <DropdownItem
              key="profile"
              textValue="wallet"
              className="py-3 px-4 border-b border-gray-700"
            >
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-400">Wallet Address</p>
                <Text style={{ padding: "12px", color: "#60a5fa" }} copyable>
                  {address}
                </Text>
              </div>
              {/* Add formatted balance and its symbol*/}
              <div className="flex items-center py-2">
                <Text
                  style={{
                    color: "white ",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Balance: {Number(balance).toFixed(4)} {data?.symbol}
                </Text>
              </div>
            </DropdownItem>
            <DropdownItem
              key="settings"
              className="py-3 px-4 hover:bg-[#2c2f32] text-white"
              textValue="profile"
            >
              <Link to="/profile" className="text-sm text-white no-underline">
                <span>My Profile</span>
              </Link>
            </DropdownItem>
            <DropdownItem
              key="logout"
              className="py-3 px-4 hover:bg-[#2c2f32] text-white"
              textValue="logout"
              onPress={disconnectHandler}
            >
              <span className="text-sm text-white group-hover:text-red-500 group-active:text-red-700 transition-colors">
                Log Out
              </span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
};

export default ProfileDropDown;
