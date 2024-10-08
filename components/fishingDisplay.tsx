import { fishingMobs } from "@/constants/fishing";
import { FishingMobDisplay } from "./fishingMobDisplay";
import { useState } from "react";
import { TROPHY_FISH } from "@/constants/trophyfish";
import { TrophyFishDisplay } from "./trophyFishDisplay";

export const FishingDisplay = ({ playerData }: { playerData: any }) => {
  const [SeaDisplayed, setDisplaySea] = useState<boolean>(false);
  const [trophyDisplayed, setDisplayTrophy] = useState<boolean>(false);
  console.log(playerData);
  const mobsKilled: any[] = [];
  const bestiary = Object.entries(playerData["bestiary"]["kills"]);
  fishingMobs.forEach((mobs) => {
    const bestiaryMob = bestiary.find(
      (bestiaryMob) => bestiaryMob[0] === mobs["mobs"][0]
    );
    if (bestiaryMob) {
      mobsKilled.push([bestiaryMob[1], mobs]);
    }
  });

  return (
    <div>
      <div>
        <div>
          <span style={{ fontWeight: "bold", color: "rgba(255,255,255,0.6)" }}>
            Items Fished:
          </span>
          <span style={{ fontWeight: "700" }}>
            {" " + playerData["player_stats"]["items_fished"]["total"]}
          </span>
        </div>
        <div>
          <span style={{ fontWeight: "bold", color: "rgba(255,255,255,0.6)" }}>
            Treasures Fished:
          </span>
          <span style={{ fontWeight: "700" }}>
            {" " + playerData["player_stats"]["items_fished"]["treasure"]}
          </span>
        </div>
        <div>
          <span style={{ fontWeight: "bold", color: "rgba(255,255,255,0.6)" }}>
            Large Treasures Fished:
          </span>
          <span style={{ fontWeight: "700" }}>
            {" " + playerData["player_stats"]["items_fished"]["large_treasure"]}
          </span>
        </div>
        <div>
          <span style={{ fontWeight: "bold", color: "rgba(255,255,255,0.6)" }}>
            Sea Creatures Killed:
          </span>
          <span style={{ fontWeight: "700" }}>
            {" " + playerData["player_stats"]["sea_creature_kills"]}
          </span>
        </div>
        <div>
          <span style={{ fontWeight: "bold", color: "rgba(255,255,255,0.6)" }}>
            Trophy Fishes Caught:
          </span>
          <span style={{ fontWeight: "700" }}>
            {" " + playerData["player_stats"]["items_fished"]["trophy_fish"]}
          </span>
        </div>
      </div>
      <button
        style={{
          marginTop: "24px",
          fontWeight: "600",
          fontSize: "28px",
          cursor: "pointer",
        }}
        onClick={() => setDisplaySea(!SeaDisplayed)}
      >
        Sea Creatures {SeaDisplayed ? "↑" : "↓"}
      </button>
      {SeaDisplayed && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "20px",
            gap: "20px",
          }}
        >
          {mobsKilled.map((mob) => (
            <FishingMobDisplay
              key={mob[1]["name"]}
              mobInfo={mob[1]}
              mobValue={mob[0]}
            ></FishingMobDisplay>
          ))}
        </div>
      )}
      <br></br>
      <button
        style={{
          marginTop: "24px",
          fontWeight: "600",
          fontSize: "28px",
          cursor: "pointer",
        }}
        onClick={() => setDisplayTrophy(!trophyDisplayed)}
      >
        Trophy Fishing {trophyDisplayed ? "↑" : "↓"}
      </button>
      {trophyDisplayed && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "20px",
            gap: "20px",
          }}
        >
          {Object.values(TROPHY_FISH).map((fish) => (
            <TrophyFishDisplay
              key={fish["display_name"]}
              trophyData={fish}
              trophyValues={playerData["trophy_fish"]}
            ></TrophyFishDisplay>
          ))}
        </div>
      )}
    </div>
  );
};
