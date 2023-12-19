import { GetColorFromMCColor } from "@/utils/ColorStuff";
import { useEffect, useState } from "react";

export const FormattedMCLine = ({
  linexd,
  isHeader,
  count,
}: {
  linexd: any;
  isHeader: boolean;
  count: number;
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
      {data.map((value: any, index) => (
        <span key={crypto.randomUUID().toString()}>
          <span
            style={{
              color: !isHeader
                ? GetColorFromMCColor(line.substring(value, value + 2))
                : "#000000",
            }}
          >
            {line.substring(value + 2, data[index + 1])}
          </span>
          {isHeader && count > 1 && (
            <span
              style={{
                color: "#000000",
              }}
            >
              {` x${count}`}
            </span>
          )}
        </span>
      ))}
      {addRecombed && (
        <span style={{ color: "#e668c6" }}>| RARITY UPGRADED |</span>
      )}
    </>
  );
};
