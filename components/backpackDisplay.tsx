import { GetBGColorItem } from "@/utils/ColorStuff";
import { GetIconPath } from "@/utils/getIconPath";
import { FormattedMCLine } from "./FormattedLine";
import Image from "next/image";
import { useState } from "react";

export const BackpackDisplay = ({ backpackData }: { backpackData: any }) => {
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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        width: "900px",
        flexWrap: "wrap",
        marginTop: "20px",
      }}
    >
      {Object.values(backpackData).map((data: any, index) => (
        <div
          className="group relative cursor-pointer"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            padding: "15px",
            borderRadius: "8px",
            minHeight: "75px",
            minWidth: "75px",
          }}
          onMouseEnter={(e) => handleMouseEnter(index, e)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          key={index}
        >
          {data["tag"] != null && (
            <Image
              src={`${GetIconPath(data)}`}
              alt={index.toString()}
              width={45}
              height={45}
            />
          )}
          {hoveredIndex === index && data["tag"] != null && (
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
                  backgroundColor: GetBGColorItem(data),
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
      {(backpackData as []).filter((data: any) => data["tag"] != null).length <
        1 && <p>This is not a bug! Backpack is empty!</p>}
    </div>
  );
};
