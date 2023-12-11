import { Link } from "@nextui-org/link";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";

export const DataNavbar = () => {
  return (
    <Navbar position="sticky">
      <NavbarContent>
        <NavbarItem>
          <Link color="foreground" href="#armor">
            Armor
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#weapons">
            Weapons
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#inventory">
            Accessories
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#inventory">
            Inventory
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Pets
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground">
            Slayer
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Collections
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Extra Stats
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            HOTM
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Rift
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Museum
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Garden
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Fishing
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
