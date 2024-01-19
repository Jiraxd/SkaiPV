import { GetBGColorItem } from "@/utils/ColorStuff";
import { ConvertNBTToJson } from "@/utils/NBTData";
import { GetIconPath } from "@/utils/getIconPath";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormattedMCLine } from "./FormattedLine";
import { Tooltip } from "@nextui-org/tooltip";

export const MuseumItem = ({
  museumData,
  itemName,
  isSpecial,
}: {
  museumData: any;
  itemName: string;
  isSpecial: boolean;
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [item, setItem] = useState<any | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    updateMousePosition(event);
  };

  const updateMousePosition = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    if (isSpecial) {
      const getItem = async () => {
        const itemDecoded = await ConvertNBTToJson(museumData["items"]["data"]);
        setItem(itemDecoded["0"]);
      };
      getItem();
    } else {
      const itemFound: any = Object.entries(museumData).find(
        ([key, value]) => key === itemName
      );
      const getItem = async () => {
        const itemDecoded = await ConvertNBTToJson(
          itemFound["1"]["items"]["data"]
        );
        setItem(itemDecoded["0"]);
      };
      if (itemFound) getItem();
    }
  }, []);
  return (
    <Tooltip
      isDisabled={item != null}
      content={itemName.replace(/_/g, " ")}
      delay={0}
      closeDelay={0}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            },
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.1,
              ease: "easeOut",
            },
          },
        },
      }}
    >
      <div
        className="group relative cursor-pointer"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          padding: "15px",
          borderRadius: "8px",
          minHeight: "75px",
          minWidth: "75px",
          maxHeight: "75px",
          maxWidth: "75px",
        }}
        onMouseEnter={(event) => {
          setHovered(true);
          updateMousePosition(event);
        }}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={
            item != null
              ? `${GetIconPath(item)}`
              : "/zajebanyicony/nodonate.png"
          }
          alt={itemName}
          width={45}
          height={45}
          unoptimized
        />

        {hovered && item != null && item["tag"] != null && (
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
                backgroundColor: GetBGColorItem(item),
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
                  count={item["Count"]}
                  linexd={item["tag"]["display"]["Name"] as string}
                  isHeader={true}
                />
              </p>
            </div>
            <div className="p-4">
              {Object.values(item["tag"]["display"]["Lore"]).map(
                (value: any, index: number) => (
                  <>
                    <FormattedMCLine
                      count={item["Count"]}
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
    </Tooltip>
  );
};
