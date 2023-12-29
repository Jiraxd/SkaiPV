import { MainProfilePage } from "@/components/MainProfilePage";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { profile: string[] };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
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
