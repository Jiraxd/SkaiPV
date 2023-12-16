"use client";

import { ConvertNBTToJson } from "@/utils/NBTData";
import { useEffect, useState } from "react";
import Image from "next/image";
import { InventoryContainer } from "./InventoryContainer";

export const InvDisplay = ({ playerData }: { playerData: any }) => {
  const [invContents, setInvContents] = useState<any[] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedSection, setSelected] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [navbarHoveredIndex, setNavbarHoveredIndex] = useState<number>(-1);
  useEffect(() => {
    const fetchData = async () => {
      const inventory = playerData["inventory"]["inv_contents"]["data"];
      const invDecoded = await ConvertNBTToJson(inventory);
      setInvContents(invDecoded);
    };
    fetchData();
  }, []);
  if (playerData["inventory"] == null)
    return <div>Player has API disabled!</div>;

  const handleMouseEnter = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setHoveredIndex(index);
    updateMousePosition(event);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    updateMousePosition(event);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const updateMousePosition = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  if (invContents == null) return <div>Loading...</div>;
  console.log(invContents);

  const navbarList = [
    { label: "INV", iconName: "inv" },
    { label: "STORAGE", iconName: "chest" },
    { label: "ENDER", iconName: "ender" },
    { label: "VAULT", iconName: "vault" },
    { label: "POTS", iconName: "pots" },
    { label: "FISH", iconName: "fish" },
    { label: "QUIVER", iconName: "arrow" },
  ];
  return (
    <div
      style={{
        display: "inline-block",
        backgroundColor: "rgba(20,20,20, 0.3)",
        padding: "20px",
        position: "relative",
        borderRadius: "10px",
        width: "900px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          paddingBottom: "8px",
          borderBottom: "4px solid #0bca51",
        }}
      >
        {navbarList.map((nav, index) => (
          <button
            onClick={() => setSelected(index)}
            onMouseEnter={() => setNavbarHoveredIndex(index)}
            onMouseLeave={() => setNavbarHoveredIndex(-1)}
            key={nav.label}
            style={{
              borderTop:
                selectedSection === index
                  ? "2px solid #0bca51"
                  : "2px solid transparent",
              display: "flex",
              alignItems: "center",
              padding: "4px",
              cursor: "pointer",
              transition: "border-top 0.3s ease-in-out",
              ...(navbarHoveredIndex === index && {
                borderTop: "2px solid #0bca51",
              }),
            }}
          >
            <Image
              src={`/zajebanyicony/${nav.iconName}.png`}
              alt={nav.label}
              width={32}
              height={32}
            />
            <div style={{ marginLeft: "8px" }}>{nav.label}</div>
          </button>
        ))}
      </div>
      <div>
        {selectedSection === 0 && (
          <InventoryContainer inventoryxd={invContents}></InventoryContainer>
        )}
        {/* TODO: Přidat zbytek */}
      </div>
    </div>
  );
};
