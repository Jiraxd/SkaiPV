import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";

export const DataNavbar = () => {
  const navbarItems = [
    { id: "armor", label: "Armor" },
    { id: "wardrobe", label: "Weapons" },
    { id: "weapons", label: "Accessory Bag" },
    { id: "accessories", label: "Inventory" },
    { id: "inventory", label: "Pets" },
    { id: "pets", label: "Slayer" },
    { id: "slayer", label: "Collections" },
    { id: "collections", label: "HOTM" },
    { id: "hotm", label: "Rift" },
    { id: "rift", label: "Museum" },
    { id: "museum", label: "Garden" },
    { id: "garden", label: "Fishing" },
    { id: "fishing", label: "Extra Stats" },
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
