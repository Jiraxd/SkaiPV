import { MainProfilePage } from "@/components/MainProfilePage";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { profile: string[] };
  parent: ResolvingMetadata;
}): Promise<Metadata> {
  const returnValue = params.profile[1];
  return {
    title: returnValue,
  };
}

export default function displaydata({
  params,
}: {
  params: { profile: string[] };
}) {
  return (
    <>
      <MainProfilePage params={params}></MainProfilePage>
    </>
  );
}
