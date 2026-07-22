import { getServerSideProps } from "@/_components/api/general";
import Services from "@/_components/Pages/Services";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
export const runtime = "edge";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    return generatePageMetadata("pages/our-services", locale);
}

export default async function Page({ params }: { params: { locale: string } }) {
    const PageData = await getServerSideProps("pages/our-services", params.locale);
    const CTAData = await getServerSideProps("components/cta", params.locale);

    return <Services data={PageData.props.data.data} NeedHelpComp={CTAData.props.data.data.extra_content} />;
}

