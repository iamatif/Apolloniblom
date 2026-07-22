import { getServerSideProps } from "@/_components/api/general";
import AboutUs from "@/_components/Pages/AboutUs";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
export const runtime = "edge";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    return generatePageMetadata("pages/about-us", locale);
}

export default async function Page({ params }: { params: { locale: string } }) {
    const PageData = await getServerSideProps("pages/about-us", params.locale);
    const CTAData = await getServerSideProps("components/cta", params.locale);

    return <AboutUs data={PageData.props.data.data} NeedHelpComp={CTAData.props.data.data.extra_content} />;
}

