"use client";
import { ConvertNBTToJson } from "@/utils/NBTData";
import { useEffect, useState } from "react";

export const AccDisplay = ({ playerData }: { playerData: any }) => {
  const [accs, setAccs] = useState<any>(null);
  const [allAccs, setAllaccs] = useState<any>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    setHoveredIndex(-1);
  };

  const updateMousePosition = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    if (
      playerData["inventory"] === null ||
      playerData["inventory"] === undefined
    ) {
      setAccs("null");
      return;
    }
    const encodedInv =
      playerData["inventory"]["bag_contents"]["talisman_bag"]["data"];
    const convert = async () => {
      const accData = await fetch(
        `https://api.hypixel.net/v2/resources/skyblock/items`, { cache: 'force-cache' }
      ).then((res) => res.json());
      setAllaccs(accData);
      if (encodedInv != undefined) {
        const invContent = await ConvertNBTToJson(encodedInv);
        setAccs(invContent.filter((acc) => acc["tag"] != null));
      }
    };
    convert();
  }, [playerData]);
  if (accs === null) return <div>Loading...</div>;
  if (accs === "null") return <div>Player has API disabled!</div>;
  console.log(accs);
  console.log(allAccs);
  return <div>test</div>;
};
