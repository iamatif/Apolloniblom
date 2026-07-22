import { getServerSideProps } from "@/_components/api/general";
import PrivacyPolicy from "@/_components/Pages/PrivacyPolicy";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
export const runtime = "edge";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    return generatePageMetadata("pages/privacy-policy", locale);
}

export default async function Page({ params }: { params: { locale: string } }) {
    const PageData = await getServerSideProps("pages/privacy-policy", params.locale);
    const CTAData = await getServerSideProps("components/cta", params.locale);

    return <PrivacyPolicy data={PageData.props.data.data} NeedHelpComp={CTAData.props.data.data.extra_content} />;
}

