import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";

export const DataNavbar = () => {
  const navbarItems = [
    { id: "armor", label: "Armor" },
    { id: "wardrobe", label: "Weapons" },
    { id: "weapons", label: "Accessories" },
    { id: "accessories", label: "Pets" },
    { id: "pets", label: "Slayer" },
    { id: "slayer", label: "Collections" },
    { id: "collections", label: "Extra Stats" },
    { id: "extrastats", label: "HOTM" },
    { id: "hotm", label: "Rift" },
    { id: "rift", label: "Museum" },
    { id: "museum", label: "Garden" },
    { id: "garden", label: "Fishing" },
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
