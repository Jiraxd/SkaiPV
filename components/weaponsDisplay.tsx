import { ConvertNBTToJson } from "@/utils/NBTData";
import { useEffect, useState } from "react";
import { FormattedMCLine } from "./FormattedLine";
import { GetBGColorItem } from "@/utils/ColorStuff";
import { GetIconPath } from "@/utils/getIconPath";
import Image from "next/image";

export const WeaponsDisplay = ({ playerData }: { playerData: any }) => {
  const [weapons, setWeapons] = useState<any>(null);
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
      setWeapons("null");
      return;
    }
    const encodedInv = playerData["inventory"]["inv_contents"]["data"];
    const encodedEnder =
      playerData["inventory"]["ender_chest_contents"]["data"];
    const encodedBackpack = playerData["inventory"]["backpack_contents"];
    const convert = async () => {
      let weapons: any[] = [];
      if (encodedInv != undefined) {
        const invContent = await ConvertNBTToJson(encodedInv);
        weapons = weapons.concat(invContent);
      }
      if (encodedBackpack != undefined) {
        for (let i = 0; i < 17; i++) {
          if (encodedBackpack[i.toString()] != null) {
            const content = await ConvertNBTToJson(
              encodedBackpack[i.toString()]["data"]
            );
            weapons = weapons.concat(content);
          }
        }
      }
      if (encodedEnder != undefined) {
        const enderContent = await ConvertNBTToJson(encodedEnder);
        weapons = weapons.concat(enderContent);
      }
      weapons = await weapons.filter(
        (f) => f["tag"] != null || f["tag"] != undefined
      );
      weapons = await weapons.filter(
        (f) =>
          (f["tag"]["display"]["Lore"] as string[])[
            (f["tag"]["display"]["Lore"] as string[]).length - 1
          ].includes("SWORD" || "BOW") === true
      );
      setWeapons(weapons);
    };
    convert();
  }, [playerData]);
  if (weapons === null) return <div>Loading...</div>;
  if (weapons === "null") return <div>Player has API disabled!</div>;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        flexWrap: "wrap",
        width: "85%",
      }}
    >
      {Object.values(weapons).map((value: any, index) => (
        <div
          className="group relative cursor-pointer"
          style={{
            backgroundColor: GetBGColorItem(value),
            padding: "15px",
            borderRadius: "8px",
          }}
          onMouseEnter={(e) => handleMouseEnter(index, e)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          key={index}
        >
          <Image
            src={`${GetIconPath(value)}`}
            alt={index.toString()}
            width={45}
            height={45}
          />
          {hoveredIndex === index && (
            <div
              className="fixed top-0 left-0 rounded"
              style={{
                left: `${mousePosition.x}px`,
                transform: "translateX(-105%) translateY(-75%)",
                top: `${mousePosition.y}px`,
                zIndex: "1500",
                borderRadius: "8px",
                backgroundColor: "#0f0f0f",
              }}
            >
              <div
                style={{
                  backgroundColor: GetBGColorItem(value),
                  padding: "15px",
                  width: "100%",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    color: "#000000",
                    fontSize: "20px",
                  }}
                >
                  <FormattedMCLine
                    linexd={value["tag"]["display"]["Name"] as string}
                    isHeader={true}
                  />
                </p>
              </div>
              <div className="p-4">
                {Object.values(value["tag"]["display"]["Lore"]).map(
                  (value: any, index: number) => (
                    <>
                      <FormattedMCLine linexd={value} isHeader={false} />
                      <br />
                    </>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
