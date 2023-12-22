"use client";
import { GetColorFromMCColor } from "@/utils/ColorStuff";
import { stat } from "@/utils/statsFromItem";
import { STATS_DATA } from "../constants/stats";
import { useEffect, useState } from "react";

export function getColorForStat(statName: string): string {
  const stat = Object.values(STATS_DATA).find(
    (value) => value.nameLore === statName
  );

  if (stat) {
    return stat.color;
  } else {
    return "c";
  }
}

function getShortName(statName: string): string {
  const stat = Object.values(STATS_DATA).find(
    (value) => value.nameLore === statName
  );
  if (stat) {
    return stat.nameTiny;
  } else {
    return "??";
  }
}

export const ShowStats = ({ pData }: { pData: any }) => {
  const [statsList, setStats] = useState<stat[] | null>(null);
  useEffect(() => {
    const list: stat[] = [];

    Object.values(pData).forEach((value: any) => {
      for (const valuexd of Object.values(value["tag"]["display"]["Lore"])) {
        console.log(valuexd);
        if ((valuexd as string).includes("[")) break;
        if (!(valuexd as string).includes("Gear Score")) {
          if (valuexd === "") break;
          const line = (valuexd as string).replace(/§l/g, "");
          const name = line.substring(line.indexOf("§") + 2, line.indexOf(":"));
          let value: number = 0;

          const substringxd = line.substring(
            line.indexOf(":") + 1,
            line.length
          );
          if (line.indexOf("(") === -1)
            value = parseInt(
              substringxd.substring(
                substringxd.indexOf("§") + 2,
                substringxd.length
              )
            );
          else
            value = parseInt(
              substringxd.substring(
                substringxd.indexOf("§") + 2,
                substringxd.indexOf("(")
              )
            );
          console.log(name);
          const valuestat: stat = {
            name: name,
            value: value,
            color: getColorForStat(name),
            shortName: getShortName(name),
          };

          const statFromList = list.find((f) => f.name === valuestat.name);
          if (statFromList) statFromList.value += valuestat.value;
          else list.push(valuestat);
        }
      }
    });
    setStats(list);
  }, []);
  if (statsList == null) return <span>Loading...</span>;
  return (
    <>
      {Object.values(statsList).map((valuestat, index) => (
        <span
          key={index}
          style={{
            color: GetColorFromMCColor("§" + valuestat.color),
          }}
        >
          {index === statsList.length - 1
            ? valuestat.value + " " + valuestat.shortName
            : valuestat.value + " " + valuestat.shortName}
          <span
            style={{
              color: "GrayText",
            }}
          >
            {index === statsList.length - 1 ? "" : " // "}
          </span>
        </span>
      ))}
    </>
  );
};
