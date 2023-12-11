import { ConvertNBTToJson } from "@/utils/NBTData";
import { GetBGColorItem } from "@/utils/ColorStuff";
import { GetIconPath } from "@/utils/getIconPath";
import { useState, useEffect } from "react";
import { FormattedMCLine } from "./FormattedLine";

export const WardrobeDisplay = (playerDataxd: any) => {
  const [wardrobe, setWardrobe] = useState<any>(null);
  const playerData = playerDataxd["playerData"];
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>,
    section: number
  ) => {
    setHoveredIndex(index);
    setHoveredSection(section);
    updateMousePosition(event);
  };

  const GetBGClr = () => {
    switch (hoveredSection) {
      case 0:
        return GetBGColorItem(helmets[hoveredIndex]);
      case 1:
        return GetBGColorItem(chestplates[hoveredIndex]);
      case 2:
        return GetBGColorItem(leggings[hoveredIndex]);
      case 3:
        return GetBGColorItem(boots[hoveredIndex]);
      default:
        return "#002020";
    }
  };

  const getData = () => {
    switch (hoveredSection) {
      case 0:
        return helmets[hoveredIndex]["tag"]["display"];
      case 1:
        return chestplates[hoveredIndex]["tag"]["display"];
      case 2:
        return leggings[hoveredIndex]["tag"]["display"];
      case 3:
        return boots[hoveredIndex]["tag"]["display"];
      default:
        break;
    }
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
      setWardrobe("null");
      return;
    }
    const encoded = playerData["inventory"]["wardrobe_contents"]["data"];
    const convert = async () => {
      const armorValue = await ConvertNBTToJson(encoded);
      setWardrobe(armorValue);
    };
    convert();
  }, [playerData]);

  if (wardrobe === null) return <div>Loading...</div>;
  if (wardrobe === "null") return <div>Player has API disabled!</div>;

  const helmetsTemp: any[] = (wardrobe as any[])
    .slice(0, 9)
    .concat((wardrobe as any[]).slice(36, 45));
  const chestplatesTemp: any[] = (wardrobe as any[])
    .slice(9, 18)
    .concat((wardrobe as any[]).slice(45, 54));
  const leggingsTemp: any[] = (wardrobe as any[])
    .slice(18, 27)
    .concat((wardrobe as any[]).slice(54, 63));
  const bootsTemp: any[] = (wardrobe as any[])
    .slice(27, 36)
    .concat((wardrobe as any[]).slice(63, 72));
  let helmets: any[] = [];
  let chestplates: any[] = [];
  let leggings: any[] = [];
  let boots: any[] = [];
  helmetsTemp.forEach((value: any, index: number) => {
    if (
      value["tag"] === undefined &&
      chestplatesTemp[index]["tag"] === undefined &&
      leggingsTemp[index]["tag"] === undefined &&
      bootsTemp[index]["tag"] === undefined
    ) {
    } else {
      helmets.push(value);
      chestplates.push(chestplatesTemp[index]);
      leggings.push(leggingsTemp[index]);
      boots.push(bootsTemp[index]);
    }
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          gap: "14px",
          width: "100h",
          paddingBottom: "26px",
        }}
      >
        {Object.values(helmets).map((data: any, index: number) => (
          <div className="group relative" key={index}>
            {data["tag"] === undefined ? (
              <div
                style={{
                  backgroundColor: GetBGColorItem(data),
                  padding: "32px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  minWidth: "64px",
                  maxWidth: "64px",
                }}
              >
                {" "}
              </div>
            ) : (
              <img
                className="cursor-pointer"
                style={{
                  backgroundColor: GetBGColorItem(data),
                  padding: "6px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  minWidth: "64px",
                  maxWidth: "64px",
                }}
                src={`${GetIconPath(data)}`}
                alt={index.toString()}
                width={64}
                height={64}
                onMouseEnter={(e) => handleMouseEnter(index, e, 0)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            )}
            {chestplates[index]["tag"] === undefined ? (
              <div
                style={{
                  backgroundColor: GetBGColorItem(chestplates[index]),
                  padding: "32px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  minWidth: "64px",
                  maxWidth: "64px",
                }}
              >
                {" "}
              </div>
            ) : (
              <img
                className="cursor-pointer"
                style={{
                  backgroundColor: GetBGColorItem(chestplates[index]),
                  padding: "6px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  minWidth: "64px",
                  maxWidth: "64px",
                }}
                src={`${GetIconPath(chestplates[index])}`}
                alt={index.toString()}
                width={64}
                height={64}
                onMouseEnter={(e) => handleMouseEnter(index, e, 1)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            )}
            {leggings[index]["tag"] === undefined ? (
              <div
                style={{
                  backgroundColor: GetBGColorItem(leggings[index]),
                  padding: "32px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  minWidth: "64px",
                  maxWidth: "64px",
                }}
              >
                {" "}
              </div>
            ) : (
              <img
                className="cursor-pointer"
                style={{
                  backgroundColor: GetBGColorItem(leggings[index]),
                  padding: "6px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  minWidth: "64px",
                  maxWidth: "64px",
                }}
                src={`${GetIconPath(leggings[index])}`}
                alt={index.toString()}
                width={64}
                height={64}
                onMouseEnter={(e) => handleMouseEnter(index, e, 2)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            )}
            {boots[index]["tag"] === undefined ? (
              <div
                style={{
                  backgroundColor: GetBGColorItem(boots[index]),
                  padding: "32px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  minWidth: "64px",
                  maxWidth: "64px",
                }}
              >
                {" "}
              </div>
            ) : (
              <img
                className="cursor-pointer"
                style={{
                  backgroundColor: GetBGColorItem(boots[index]),
                  padding: "6px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  minWidth: "64px",
                  maxWidth: "64px",
                }}
                src={`${GetIconPath(boots[index])}`}
                alt={index.toString()}
                width={64}
                height={64}
                onMouseEnter={(e) => handleMouseEnter(index, e, 3)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            )}
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
                    backgroundColor: GetBGClr(),
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
                      linexd={(getData() as any)["Name"] as string}
                      isHeader={true}
                    />
                  </p>
                </div>
                <div className="p-4">
                  {Object.values((getData() as any)["Lore"]).map(
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
    </>
  );
};
