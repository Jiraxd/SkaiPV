"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { SearchIcon } from "./icons";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleButtonClick = () => {
    const searchArgument = inputValue;
    if (searchArgument != "") {
      router.push(`/profile/${searchArgument}`);
    }
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  return (
    <div
      className="flex flex-col items-center gap-4"
      style={{
        backgroundColor: "rgba(20, 20, 20, 0.6)",
        padding: 50,
        borderRadius: "15px",
      }}
    >
      <Input
        type="search"
        value={inputValue}
        onInput={handleInputChange}
        label="View player's profile"
        placeholder="Enter username"
        style={{
          width: 500,
          backgroundColor: "rgba(20, 20, 20, 0.0)",
        }}
      />
      <Button
        color="success"
        size="md"
        radius="md"
        onClick={handleButtonClick}
        startContent={<SearchIcon />}
        style={{
          height: 50,
          width: 150,
        }}
      >
        SEARCH
      </Button>
    </div>
  );
};
