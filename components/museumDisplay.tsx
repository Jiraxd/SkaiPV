import { useEffect, useState } from "react";
import Image from "next/image";
import { Tooltip } from "@nextui-org/tooltip";
import { museumConstant } from "@/constants/museum";
import { IStringIndex } from "./PetsDisplay";
import { MuseumItem } from "./museumItem";

const SelectedCategory = ["Weapon", "Armor", "Rarities", "Special"];

export const MuseumDisplay = ({
  profileID,
  playerUUID,
}: {
  profileID: string;
  playerUUID: any;
}) => {
  const [category, setCategory] = useState<number>(0);
  const [selectedPage, setPage] = useState<number>(1);
  const [museumData, setMuseum] = useState<any | null>(null);
  useEffect(() => {
    const getMuseum = async () => {
      const dataMuseum = await fetch(`/api/museumAPI?id=${profileID}`).then(
        (res) => res.json()
      );
      setMuseum(dataMuseum["members"][playerUUID]);
    };
    getMuseum();
  }, []);
  if (museumData == null) return <div>Loading...</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "80px 800px",
        gap: "32px",
      }}
    >
      <div
        style={{
          gap: "32px",
          backgroundColor: "rgba(20,20,20, 0.5)",
          padding: "16px",
          display: "grid",
          alignItems: "center",
          borderRadius: "12px",
        }}
      >
        {Object.values(SelectedCategory).map((value, index) => (
          <Tooltip content={value} key={value}>
            <div
              style={{
                display: "flex",
                borderBottom:
                  index === category
                    ? "5px solid #0bca51"
                    : "5px solid transparent",
                flexWrap: "wrap",
                textAlign: "center",
                padding: "8px",
                cursor: "pointer",
                transition: "border-bottom 0.3s ease-in-out",
                backgroundColor: "rgba(40,40,40, 0.3)",
                borderRadius: "12px",
              }}
              onClick={() => {
                setCategory(index);
              }}
            >
              <Image
                src={`/zajebanyicony/${value}.png`}
                width={40}
                height={40}
                alt={value.toString()}
              ></Image>
            </div>
          </Tooltip>
        ))}
      </div>
      <div
        style={{
          display: "inline-block",
          backgroundColor: "rgba(20,20,20, 0.3)",
          padding: "20px",
          position: "relative",
          borderRadius: "10px",
          width: "685px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "685px",
            flexWrap: "wrap",
          }}
        >
          {((museumConstant as IStringIndex)[SelectedCategory[category]] as [])
            .filter(
              (value, index) =>
                index <= 28 * selectedPage && index > 28 * (selectedPage - 1)
            )
            .map((item: any, index: number) => (
              <MuseumItem
                museumData={museumData["items"]}
                itemName={item}
                key={index}
              ></MuseumItem>
            ))}
        </div>
      </div>
    </div>
  );
};
