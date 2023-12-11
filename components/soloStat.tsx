import { STATS_DATA } from "@/constants/stats";
import { PlayerStats } from "@/models/playerStats";
import { GetColorFromMCColor } from "@/utils/ColorStuff";
import { Spacer } from "@nextui-org/spacer";

export const SoloStat = ({ playerstat }: { playerstat: PlayerStats }) => {
  let icon = Object.values(STATS_DATA).find(
    (stats) => stats.nameShort === playerstat.stat
  );
  let color = "#ffffff";
  if (icon) color = GetColorFromMCColor("§" + icon.color);
  return (
    <div
      style={{
        justifyContent: "left",
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      <span style={{ color: color }}>{icon?.symbol}</span>
      <Spacer x={2}></Spacer>
      <span style={{ color: color }}>{`${playerstat.stat}`}</span>
      <Spacer x={2}></Spacer>
      <span>{`${playerstat.value}`}</span>
    </div>
  );
};
