"use client";
import React from "react";
import { Progress } from "@nextui-org/progress";
import Image from "next/image";
import { SoloStat } from "./soloStat";
import { CalculateStats } from "@/utils/calculateStats";
import { PlayerStats } from "@/models/playerStats";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { FormatNumber } from "@/utils/formatNumber";
import { getNetworth } from "skyhelper-networth";
import { useEffect, useState } from "react";
import { GetSkillLevel } from "@/utils/getSkillLevel";

export const StatsDisplay = ({
  playerData,
  banking,
  uuid,
  skillData,
}: {
  playerData: any;
  banking: any;
  uuid: any;
  skillData: any;
}) => {
  const [networth, setNetworth] = useState("0");
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/api/museumAPI?id=${uuid}`);
      const museumData = data.json();
      const networth = await getNetworth(playerData, moneyBank, {
        v2Endpoint: true,
        museumData,
      });
      return networth;
    };
    fetchData().then((valuexd) => {
      setNetworth(FormatNumber(valuexd.networth));
    });
  }, []);
  const stats: PlayerStats[] = CalculateStats(playerData);
  const date = new Date(playerData["profile"]["first_join"]);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day < 10 ? "0" : ""}${day} ${
    month < 10 ? "0" : ""
  }${month} ${year}`;
  const formattedMoney = FormatNumber(
    playerData["currencies"]["coin_purse"] as number
  );
  let moneyBank = 0;
  if (banking != null) {
    moneyBank = banking["balance"];
  }
  const formattedBank = FormatNumber(moneyBank);
  const averageskill = GetSkillLevel(playerData, skillData);
  const fairySouls = `${playerData["fairy_soul"]["total_collected"]} / 242`;
  return (
    <div>
      <br></br>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
        }}
      >
        {stats.map((playerstat) => {
          return (
            <SoloStat playerstat={playerstat} key={playerstat.stat}></SoloStat>
          );
        })}
      </div>
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        <span
          style={{
            color: "gray",
          }}
        >
          Joined:{" "}
          <span
            style={{
              color: "white",
            }}
          >
            {formattedDate}
          </span>
        </span>
        <span
          style={{
            color: "gray",
          }}
        >
          Purse:{" "}
          <span
            style={{
              color: "white",
            }}
          >
            {formattedMoney}
          </span>
        </span>
        <span
          style={{
            color: "gray",
          }}
        >
          Bank:{" "}
          <span
            style={{
              color: "white",
            }}
          >
            {formattedBank}
          </span>
        </span>
        <span
          style={{
            color: "gray",
          }}
        >
          Average Skill Level:{" "}
          <span
            style={{
              color: "white",
            }}
          >
            {averageskill}
          </span>
        </span>
        <span
          style={{
            color: "gray",
          }}
        >
          Networth:{" "}
          <span
            style={{
              color: "white",
            }}
          >
            {networth}
          </span>
        </span>
        <span
          style={{
            color: "gray",
          }}
        >
          Fairy Souls:{" "}
          <span
            style={{
              color: "white",
            }}
          >
            {fairySouls}
          </span>
        </span>
      </div>
    </div>
  );
};
