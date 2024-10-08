"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Tooltip } from "@nextui-org/tooltip";
import { museumConstant } from "@/constants/museum";
import { IStringIndex } from "./PetsDisplay";
import { MuseumItem } from "./museumItem";

export const MuseumDisplay = ({
  profileID,
  playerUUID,
}: {
  profileID: string;
  playerUUID: any;
}) => {
  const SelectedCategory = ["Weapon", "Armor", "Rarities", "Special"];
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
  let valuesMuseum: any[] = [];
  if (category != 3)
    valuesMuseum = (
      (museumConstant as IStringIndex)[SelectedCategory[category]] as []
    ).filter(
      (value, index) =>
        index <= 27 * selectedPage && index >= 27 * (selectedPage - 1)
    );
  else {
    valuesMuseum = (museumData["special"] as []).filter(
      (value, index) =>
        index <= 27 * selectedPage && index >= 27 * (selectedPage - 1)
    );
  }
  // TODO: Page selector
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
                setPage(1);
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
          maxHeight: "400px",
          minHeight: "400px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "685px",
            flexWrap: "wrap",
            maxHeight: "400px",
            minHeight: "365.5px",
          }}
        >
          {valuesMuseum.map((item: any, index: number) => (
            <MuseumItem
              museumData={category === 3 ? item : museumData["items"]}
              itemName={category === 3 ? "" : item}
              key={category === 3 ? item["donated_time"] : item}
              isSpecial={category === 3}
            ></MuseumItem>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "30px",
          }}
        >
          <p>Current page: {selectedPage}</p>
          <div
            style={{
              marginLeft: "450px",
              display: "flex",
            }}
          >
            <button
              style={{
                cursor: "pointer",
              }}
              onClick={() => selectedPage != 1 && setPage(selectedPage - 1)}
            >
              {"<--"}
            </button>
            <button
              style={{
                marginLeft: "30px",
                cursor: "pointer",
              }}
              onClick={() =>
                selectedPage * 28 <=
                  (category === 3
                    ? valuesMuseum.length
                    : (
                        (museumConstant as IStringIndex)[
                          SelectedCategory[category]
                        ] as []
                      ).length) && setPage(selectedPage + 1)
              }
            >
              {"-->"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
