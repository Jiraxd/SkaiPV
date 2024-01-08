"use client";

import { ConvertNBTToJson } from "@/utils/NBTData";
import { useEffect, useState } from "react";
import Image from "next/image";
import { InventoryContainer } from "./InventoryContainer";
import { EnderContainer } from "./enderContainer";
import { BackpacksContainer } from "./backpacksContainer";
import { StorageDataDisplay } from "./StorageDataDisplay";

export const InvDisplay = ({ playerData }: { playerData: any }) => {
  const [invContents, setInvContents] = useState<any[] | null>(null);
  const [FishContents, setFishContents] = useState<any[] | null>(null);
  const [PotionContents, setPotionContents] = useState<any[] | null>(null);
  const [VaultContents, setVaultContents] = useState<any[] | null>(null);
  const [QuiverContents, setQuiverContents] = useState<any[] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedSection, setSelected] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [navbarHoveredIndex, setNavbarHoveredIndex] = useState<number>(-1);
  useEffect(() => {
    const fetchData = async () => {
      if (playerData["inventory"]) {
        const inventory = playerData["inventory"]["inv_contents"]["data"];
        const invDecoded = await ConvertNBTToJson(inventory);
        setInvContents(invDecoded);
        const fish =
          playerData["inventory"]["bag_contents"]["fishing_bag"]["data"];
        const fishxd = await ConvertNBTToJson(fish);
        setFishContents(fishxd);
        const vault =
          playerData["inventory"]["personal_vault_contents"]["data"];
        const vaultxd = await ConvertNBTToJson(vault);
        setPotionContents(vaultxd);
        const potion =
          playerData["inventory"]["bag_contents"]["potion_bag"]["data"];
        const potionxd = await ConvertNBTToJson(potion);
        setVaultContents(potionxd);
        const quiver =
          playerData["inventory"]["bag_contents"]["quiver"]["data"];
        const quiverxd = await ConvertNBTToJson(quiver);
        setQuiverContents(quiverxd);
      }
    };
    fetchData();
  }, []);
  if (playerData["inventory"] == null)
    return <div>Player has API disabled!</div>;
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

  if (invContents == null) return <></>;
  if (VaultContents == null) return <></>;
  if (PotionContents == null) return <></>;
  if (FishContents == null) return <></>;
  if (QuiverContents == null) return <></>;

  const navbarList = [
    { label: "INV", iconName: "chest" },
    { label: "STORAGE", iconName: "chest" },
    { label: "ENDER", iconName: "ender" },
    { label: "VAULT", iconName: "vault" },
    { label: "POTS", iconName: "pots" },
    { label: "FISH", iconName: "fish" },
    { label: "QUIVER", iconName: "arrow" },
  ];
  return (
    <div
      style={{
        display: "inline-block",
        backgroundColor: "rgba(20,20,20, 0.3)",
        padding: "20px",
        position: "relative",
        borderRadius: "10px",
        width: "900px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          paddingBottom: "8px",
          borderBottom: "4px solid #0bca51",
        }}
      >
        {navbarList.map((nav, index) => (
          <button
            onClick={() => setSelected(index)}
            onMouseEnter={() => setNavbarHoveredIndex(index)}
            onMouseLeave={() => setNavbarHoveredIndex(-1)}
            key={nav.label}
            style={{
              borderTop:
                selectedSection === index
                  ? "2px solid #0bca51"
                  : "2px solid transparent",
              display: "flex",
              alignItems: "center",
              padding: "4px",
              cursor: "pointer",
              transition: "border-top 0.3s ease-in-out",
              ...(navbarHoveredIndex === index && {
                borderTop: "2px solid #0bca51",
              }),
            }}
          >
            <Image
              src={`/zajebanyicony/${nav.iconName}.png`}
              alt={nav.label}
              width={32}
              height={32}
            />
            <div style={{ marginLeft: "8px" }}>{nav.label}</div>
          </button>
        ))}
      </div>
      <div>
        {selectedSection === 0 ? (
          invContents != undefined && (
            <div
              className="opacity-0"
              onLoad={(e) => (e.currentTarget.className = "opacity-100")}
              style={{
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              <InventoryContainer
                inventoryxd={invContents}
              ></InventoryContainer>
            </div>
          )
        ) : (
          <></>
        )}
        {selectedSection === 1 ? (
          playerData["inventory"]["backpack_contents"] != undefined ? (
            playerData["inventory"]["backpack_icons"] != undefined ? (
              <div
                className="opacity-0"
                onLoad={(e) => (e.currentTarget.className = "opacity-100")}
                style={{
                  transition: "opacity 0.5s ease-in-out",
                }}
              >
                <BackpacksContainer
                  backpackData={playerData["inventory"]["backpack_contents"]}
                  backpackIcons={playerData["inventory"]["backpack_icons"]}
                ></BackpacksContainer>
              </div>
            ) : (
              <div style={{ marginTop: "20px" }}>
                Player does not have API enabled!
              </div>
            )
          ) : (
            <div style={{ marginTop: "20px" }}>
              Player does not have API enabled!
            </div>
          )
        ) : (
          <></>
        )}
        {selectedSection === 2 ? (
          playerData["inventory"]["ender_chest_contents"]["data"] !=
          undefined ? (
            <div
              className="opacity-0"
              onLoad={(e) => (e.currentTarget.className = "opacity-100")}
              style={{
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              <EnderContainer
                enderData={
                  playerData["inventory"]["ender_chest_contents"]["data"]
                }
              ></EnderContainer>
            </div>
          ) : (
            <div style={{ marginTop: "20px" }}>
              Player does not have API enabled!
            </div>
          )
        ) : (
          <></>
        )}
        {selectedSection === 3 ? (
          VaultContents.filter((f) => f["tag"] != null).length > 1 ? (
            <div
              className="opacity-0"
              onLoad={(e) => (e.currentTarget.className = "opacity-100")}
              style={{
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              <StorageDataDisplay
                StorageData={VaultContents}
              ></StorageDataDisplay>
            </div>
          ) : (
            <div style={{ marginTop: "20px" }}>
              Player does not have any items inside this storage!
            </div>
          )
        ) : (
          <></>
        )}
        {selectedSection === 4 ? (
          PotionContents.filter((f) => f["tag"] != null).length > 1 ? (
            <div
              className="opacity-0"
              onLoad={(e) => (e.currentTarget.className = "opacity-100")}
              style={{
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              <StorageDataDisplay
                StorageData={PotionContents}
              ></StorageDataDisplay>
            </div>
          ) : (
            <div style={{ marginTop: "20px" }}>
              Player does not have any items inside this storage!
            </div>
          )
        ) : (
          <></>
        )}
        {selectedSection === 5 ? (
          FishContents.filter((f) => f["tag"] != null).length > 1 ? (
            <div
              className="opacity-0"
              onLoad={(e) => (e.currentTarget.className = "opacity-100")}
              style={{
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              <StorageDataDisplay
                StorageData={FishContents}
              ></StorageDataDisplay>
            </div>
          ) : (
            <div style={{ marginTop: "20px" }}>
              Player does not have any items inside this storage!
            </div>
          )
        ) : (
          <></>
        )}
        {selectedSection === 6 ? (
          QuiverContents.filter((f) => f["tag"] != null).length > 1 ? (
            <div
              className="opacity-0"
              onLoad={(e) => (e.currentTarget.className = "opacity-100")}
              style={{
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              <StorageDataDisplay
                StorageData={QuiverContents}
              ></StorageDataDisplay>
            </div>
          ) : (
            <div style={{ marginTop: "20px" }}>
              Player does not have any items inside this storage!
            </div>
          )
        ) : (
          <></>
        )}
        {/* TODO: Přidat zbytek */}
      </div>
    </div>
  );
};
