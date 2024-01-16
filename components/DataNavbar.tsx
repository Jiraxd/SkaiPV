import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";

export const DataNavbar = () => {
  const navbarItems = [
    { id: "armor", label: "Armor" },
    { id: "wardrobe", label: "Weapons" },
    { id: "weapons", label: "Accessory Bag" },
    { id: "inventory", label: "Inventory" },
    { id: "pets", label: "Pets" },
    { id: "slayer", label: "Slayer" },
    { id: "collections", label: "Collections" },
    { id: "rift", label: "Rift" },
    { id: "museum", label: "Museum" },
    { id: "museum", label: "Fishing" },
    { id: "fishing", label: "Misc" },
  ];

  return (
    <Navbar position="sticky" id="navbarData">
      <NavbarContent>
        {navbarItems.map((item) => (
          <NavbarItem key={item.id}>
            <Link href={`#${item.id}`} style={{ cursor: "pointer" }}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
};
