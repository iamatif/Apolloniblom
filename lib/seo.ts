import { getSEOMetadata } from "@/_components/api/general";
import { Metadata } from "next";

export async function generatePageMetadata(
  endPoint: string,
  lang: string
): Promise<Metadata> {
  return await getSEOMetadata(endPoint,lang);
}
