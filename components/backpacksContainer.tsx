import { GetBGColorItem } from "@/utils/ColorStuff";
import { ConvertNBTToJson } from "@/utils/NBTData";
import { GetIconPath } from "@/utils/getIconPath";
import { useEffect, useState } from "react";
import { FormattedMCLine } from "./FormattedLine";
import Image from "next/image";
import { BackpackDisplay } from "./backpackDisplay";

export const BackpacksContainer = ({
  backpackData,
  backpackIcons,
}: {
  backpackData: any;
  backpackIcons: any;
}) => {
  const [backpackIconsParsed, setBpIcons] = useState<any>(null);
  const [backpackDataParsed, setBpData] = useState<any>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickedIndex, setClickedIndex] = useState<number>(-1);

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
    const fetchData = async () => {
      let bpIcons: any[] = [];
      let bpData: any[] = [];
      for (let i = 0; i < 18; i++) {
        if (backpackIcons[`${i}`] != null) {
          const iconParsed = await ConvertNBTToJson(
            backpackIcons[`${i}`]["data"]
          );
          bpIcons.push(iconParsed);
        } else {
          bpIcons.push(backpackIcons[`${i}`]);
        }
      }
      for (let i = 0; i < 18; i++) {
        if (backpackData[`${i}`] != null) {
          const dataParsed = await ConvertNBTToJson(
            backpackData[`${i}`]["data"]
          );
          bpData.push(dataParsed);
        } else {
          bpData.push(backpackData[`${i}`]);
        }
      }
      setBpIcons(bpIcons);
      setBpData(bpData);
    };
    fetchData();
  }, []);

  if (backpackIconsParsed == null) return <></>;
  if (backpackIconsParsed.length < 1) return <></>;
  return (
    <>
      {clickedIndex === -1 ? (
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
          {Object.values(backpackIconsParsed).map((data: any, index) => (
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
              onClick={() => data != undefined && setClickedIndex(index)}
            >
              {data != undefined && (
                <Image
                  src={`${GetIconPath(data[0])}`}
                  alt={index.toString()}
                  width={45}
                  height={45}
                />
              )}
              {hoveredIndex === index && data != undefined && data != null && (
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
                      backgroundColor: GetBGColorItem(data[0]),
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
                        count={data[0]["Count"]}
                        linexd={data[0]["tag"]["display"]["Name"] as string}
                        isHeader={true}
                      />
                    </p>
                  </div>
                  <div className="p-4">
                    {Object.values(data[0]["tag"]["display"]["Lore"]).map(
                      (value: any, index: number) => (
                        <>
                          <FormattedMCLine
                            count={data[0]["Count"]}
                            linexd={value}
                            isHeader={false}
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
          <p
            style={{
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Click on a backpack to view items inside!
          </p>
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              setHoveredIndex(null);
              setClickedIndex(-1);
            }}
            style={{ marginTop: "15px" }}
          >
            ↺ Back
          </button>
          <BackpackDisplay backpackData={backpackDataParsed[clickedIndex]} />
        </>
      )}
    </>
  );
};
