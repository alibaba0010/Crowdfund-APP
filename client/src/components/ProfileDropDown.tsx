import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { logo } from "../assets";
import { useState } from "react";

const ProfileDropDown = () => {
  const [open, setOpen] = useState(false);

  const address = useSelector((state: any) => state.wallet.addresses?.[0]);

  return (
    <div className="flex items-center gap-4">
      {address && (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="w-[100%] h-[100%] object-contain transition-transform"
              src={logo}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="profile"
              textValue="wallet"
              className="h-14 gap-2"
            >
              <p className="font-semibold">Wallet Address</p>
              <p className="font-semibold">{address}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Profile</DropdownItem>
            <DropdownItem key="all_orders">All Orders</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
};

export default ProfileDropDown;
