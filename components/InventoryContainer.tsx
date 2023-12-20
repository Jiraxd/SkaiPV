import { GetBGColorItem } from "@/utils/ColorStuff";
import { GetIconPath } from "@/utils/getIconPath";
import { FormattedMCLine } from "./FormattedLine";
import { useState, useEffect } from "react";
import Image from "next/image";

export const InventoryContainer = ({ inventoryxd }: { inventoryxd: any[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [inventory, setInventory] = useState<any[] | null>(null);

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
    let inventory = inventoryxd;
    const firstRow = inventory.slice(0, 9);
    const rest = inventory.slice(9, 36);

    setInventory(rest.concat(firstRow));
  }, []);
  if (inventory == null) return <></>;
  if (inventory.length < 1) return <></>;
  console.log(inventory);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        width: "900px",
        flexWrap: "wrap",
        marginTop: "40px",
      }}
    >
      {Object.values(inventory).map((data, index) => (
        <div
          className="group relative cursor-pointer"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            padding: "15px",
            borderRadius: "8px",
            minHeight: "75px",
            minWidth: "75px",
            marginTop: index >= 27 ? "20px" : "0px",
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
                    count={data["Count"]}
                  />
                </p>
              </div>
              <div className="p-4">
                {Object.values(data["tag"]["display"]["Lore"]).map(
                  (value: any, index: number) => (
                    <>
                      <FormattedMCLine
                        linexd={value}
                        isHeader={false}
                        count={data["Count"]}
                      />
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
