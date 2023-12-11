"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { Logo, SearchIcon, GithubIcon } from "@/components/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleButtonClick = async () => {
    const searchArgument = inputValue.trim();

    if (searchArgument !== "") {
      router.replace(`/`);
      await delay(100);
      router.replace(`/profile/${searchArgument}`);
    }
    setInputValue("");
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-0 max-w-fit">
          <Link className="flex justify-start items-center gap-0" href="/">
            <Logo />
            <p className="font-bold text-inherit">J1R4's SB Profile Viewer</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="start"
      >
        <NavbarItem className="flex justify-start items-center gap-1">
          <Input
            type="search"
            size="sm"
            label="View player's profile"
            value={inputValue}
            onInput={handleInputChange}
            placeholder="Enter username"
            style={{
              width: 500,
            }}
          />
          <Button
            color="success"
            size="md"
            radius="md"
            onClick={handleButtonClick}
            style={{
              height: 40,
              width: 100,
            }}
          >
            SEARCH
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <NavbarMenuToggle />
      </NavbarContent>
    </NextUINavbar>
  );
};
