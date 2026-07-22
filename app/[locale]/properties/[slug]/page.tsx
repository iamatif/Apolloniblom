import { getServerSideProps } from "@/_components/api/general";
import SingleProprety from "@/_components/Homepage/SingleProprety";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { slug: string, locale: string };
}): Promise<Metadata> {
    return generatePageMetadata(`properties/${slug}`, locale);
}

export default async function Page({ params }: { params: { slug: string, locale: string } }) {
    const SingleData = await getServerSideProps(`properties/${params.slug}`, params.locale);
    const CTAData = await getServerSideProps("components/cta", params.locale);

    return  <SingleProprety data={SingleData.props.data.data} NeedHelpComp={CTAData.props.data.data.extra_content} />;
}

