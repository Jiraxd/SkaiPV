import { fishingMobs } from "@/constants/fishing";
import { FishingMobDisplay } from "./fishingMobDisplay";

export const FishingDisplay = ({ playerData }: { playerData: any }) => {
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
            Trophy Fishes Fished:
          </span>
          <span style={{ fontWeight: "700" }}>
            {" " + playerData["player_stats"]["items_fished"]["trophy_fish"]}
          </span>
        </div>
      </div>
      <div
        style={{
          marginTop: "24px",
          fontWeight: "600",
          fontSize: "28px",
        }}
      >
        Sea Creatures
      </div>
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
    </div>
  );
};
