"use client";

import nbt from "prismarine-nbt";
import { ConvertNBTToJson } from "@/utils/NBTData";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GetIconPath } from "@/utils/getIconPath";
import { GetBGColorItem, GetColorFromMCColor } from "@/utils/ColorStuff";
import { Spacer } from "@nextui-org/spacer";
import { FormattedMCLine } from "./FormattedLine";
import { ShowStats } from "./StatsForItem";
export const ArmorDisplay = ({
  pData,
  isEquipment,
}: {
  pData: any;
  isEquipment: boolean;
}) => {
  const [armor, setArmor] = useState<any>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    setHoveredIndex(null);
  };

  const updateMousePosition = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };
  useEffect(() => {
    if (pData["inventory"] === null || pData["inventory"] === undefined) {
      setArmor("null");
      return;
    }
    let armorDataEncoded = "";
    if (isEquipment) {
      armorDataEncoded = pData["inventory"]["equipment_contents"]["data"];
    } else {
      armorDataEncoded = pData["inventory"]["inv_armor"]["data"];
    }
    const fetchData = async () => {
      const armorValue = await ConvertNBTToJson(armorDataEncoded);
      const armorreversed = armorValue.reverse();
      let armorek: any[] = armorreversed.filter((x) => x["tag"] != null);
      setArmor(armorek);
    };
    fetchData();
  }, []);

  if (armor === null) return <div>Loading...</div>;
  if (armor === "null") return <div>Player has API disabled!</div>;
  if ((armor as []).length === 0)
    return isEquipment ? (
      <div>Player has no equipment!</div>
    ) : (
      <div>Player has no armor!</div>
    );
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        {Object.values(armor).map((data: any, index) => (
          <div
            className="group relative cursor-pointer"
            style={{
              backgroundColor: GetBGColorItem(armor[index]),
              padding: "15px",
              borderRadius: "8px",
            }}
            onMouseEnter={(e) => handleMouseEnter(index, e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            key={index}
          >
            <img
              src={`${GetIconPath(data)}`}
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
                    backgroundColor: GetBGColorItem(armor[index]),
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
                      linexd={data["tag"]["display"]["Name"] as string}
                      isHeader={true}
                    />
                  </p>
                </div>
                <div className="p-4">
                  {Object.values(data["tag"]["display"]["Lore"]).map(
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
      <Spacer y={8} />
      <p>
        <span
          style={{
            color: "GrayText",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Bonus stats: <ShowStats pDataxd={armor} />
        </span>
      </p>
    </>
  );
};
