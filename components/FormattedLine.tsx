import { GetColorFromMCColor } from "@/utils/ColorStuff";
import { useEffect, useState } from "react";

export const FormattedMCLine = ({
  linexd,
  isHeader,
}: {
  linexd: any;
  isHeader: boolean;
}) => {
  const [data, setData] = useState<number[] | null>(null);
  let line = (linexd as string).replace(/§l/g, "");
  let addRecombed = false;
  if (line.includes("§k")) {
    line = line.substring(line.indexOf("§k") + 1, line.lastIndexOf("§k") - 1);
    addRecombed = true;
  }
  useEffect(() => {
    const occurrences: number[] = [];
    let index = line.indexOf("§");
    while (index !== -1) {
      occurrences.push(index);
      index = line.indexOf("§", index + 1);
    }
    setData(occurrences);
  }, []);
  if (data === null) return <></>;
  if (data.length === 0) return <></>;
  return (
    <>
      {data.map((value, index) => (
        <span
          key={crypto.randomUUID().toString()}
          style={{
            color: !isHeader
              ? GetColorFromMCColor(line.substring(value, value + 2))
              : "#000000",
          }}
        >
          {line.substring(value + 2, data[index + 1])}
        </span>
      ))}
      {addRecombed && (
        <span style={{ color: "#e668c6" }}>| RARITY UPGRADED |</span>
      )}
    </>
  );
};
