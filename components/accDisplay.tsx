"use client";
import {
  ACCESSORY_ALIASES,
  accessoryUpgrades,
  ignoredAccessories,
} from "@/constants/accessories";
import { GetBGColorItem, GetColorFromRarity } from "@/utils/ColorStuff";
import { ConvertNBTToJson } from "@/utils/NBTData";
import { GetIconPath, getItemPathFromName } from "@/utils/getIconPath";
import { useEffect, useState } from "react";
import { FormattedMCLine } from "./FormattedLine";
import { Spacer } from "@nextui-org/spacer";
import Image from "next/image";

export const AccDisplay = ({
  playerData,
  accData,
}: {
  playerData: any;
  accData: any;
}) => {
  const [accs, setAccs] = useState<any>(null);
  const [allAccs, setAllaccs] = useState<any>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [Clicked, setClicked] = useState<boolean>(false);

  const handleMouseEnter = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>,
    section: number
  ) => {
    setHoveredIndex(index);
    updateMousePosition(event);
    setHoveredSection(section);
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
      if (encodedInv != undefined) {
        const invContent = await ConvertNBTToJson(encodedInv);
        const accsPlayer = await invContent.filter((acc) => acc["tag"] != null);
        setAccs(accsPlayer);
        const ids: any = accsPlayer.map((acc) => {
          return acc["tag"]["ExtraAttributes"]["id"];
        });
        const missingAccs = (accData["accs"] as []).filter(
          (acc) => !ids.includes(acc["id"])
        );
        let missingAccsReal: any[] = [];
        missingAccs.forEach((acc) => {
          const upgrade = accessoryUpgrades.find((f) => f.includes(acc["id"]));
          if (upgrade != undefined && upgrade != null) {
            missingAccsReal.push(
              missingAccs.find(
                (acc) => acc["id"] === upgrade[upgrade.length - 1]
              )
            );
            upgrade.forEach((upg) =>
              missingAccs.splice(
                missingAccs.findIndex((f) => f["id"] === upg),
                1
              )
            );
          } else {
            missingAccsReal.push(acc);
          }
        });
        missingAccsReal = missingAccsReal
          .filter((acc) => acc != undefined)
          .filter((acc) => !ignoredAccessories.includes(acc["id"]));
        const campfire = missingAccsReal.find((acc) =>
          (acc["id"] as string).includes("CAMPFIRE_TALISMAN_21")
        );
        if (campfire) {
          missingAccsReal = missingAccsReal.filter(
            (acc) => !(acc["id"] as string).includes("CAMPFIRE_TALISMAN")
          );
          missingAccsReal.push(campfire);
        }
        setAllaccs(missingAccsReal);
      }
    };
    convert();
  }, [playerData]);
  if (accs === null) return <div>Loading...</div>;
  if (accs === "null") return <div>Player has API disabled!</div>;
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          flexWrap: "wrap",
          width: "85%",
        }}
      >
        {Object.values(accs).map((value: any, index) => (
          <div
            className="group relative cursor-pointer"
            style={{
              backgroundColor: GetBGColorItem(value),
              padding: "15px",
              borderRadius: "8px",
            }}
            onMouseEnter={(e) => handleMouseEnter(index, e, 1)}
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
            {hoveredIndex === index && hoveredSection === 1 && (
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
                      count={value["Count"]}
                      isHeader={true}
                    />
                  </p>
                </div>
                <div className="p-4">
                  {Object.values(value["tag"]["display"]["Lore"]).map(
                    (value: any, index: number) => (
                      <>
                        <FormattedMCLine
                          count={value["Count"]}
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
      </div>
      <Spacer y={8} />
      <button
        className="cursor-pointer"
        style={{ fontSize: "24px" }}
        onClick={() => {
          const xd = document.getElementById("divformissingaccessories");
          if (xd)
            if (xd.className === "opacity-100") {
              xd.className = "opacity-0";
              setTimeout(() => {
                setClicked(!Clicked);
              }, 400);
            } else {
              setClicked(!Clicked);
            }
          else {
            setClicked(!Clicked);
          }
        }}
      >{`Missing accessories ${Clicked ? "↑" : "↓"}`}</button>
      <Spacer y={8} />
      {Clicked && (
        <div
          id="divformissingaccessories"
          onLoad={(e) => (e.currentTarget.className = "opacity-100")}
          className="opacity-0"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            flexWrap: "wrap",
            width: "85%",
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          {Object.values(allAccs).map((value: any, index) => (
            <div key={index}>
              <div
                className="group relative cursor-pointer"
                style={{
                  backgroundColor: GetColorFromRarity(value["tier"]),
                  padding: "15px",
                  borderRadius: "8px",
                  opacity: "50%",
                }}
                onMouseEnter={(e) => handleMouseEnter(index, e, 2)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src={`/${getItemPathFromName(value["id"])}`}
                  alt={index.toString()}
                  width={45}
                  height={45}
                />
              </div>
              {hoveredIndex === index && hoveredSection === 2 && (
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
                      backgroundColor: GetColorFromRarity(value["tier"]),
                      padding: "15px",
                      width: "100%",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      justifyContent: "center",
                      textAlign: "center",
                      opacity: "100%",
                    }}
                  >
                    <p
                      style={{
                        color: "#000000",
                        fontSize: "20px",
                      }}
                    >
                      {value["name"]}
                    </p>
                  </div>
                  <div className="p-4">
                    <span style={{ color: GetColorFromRarity(value["tier"]) }}>
                      {value["tier"] ? value["tier"] : "COMMON"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
