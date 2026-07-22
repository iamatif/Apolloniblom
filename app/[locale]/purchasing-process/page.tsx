import { getServerSideProps } from "@/_components/api/general";
import PurchasingProcess from "@/_components/Pages/PurchasingProcess";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
export const runtime = "edge";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    return generatePageMetadata("pages/purchasing-process", locale);
}

export default async function Page({ params }: { params: { locale: string } }) {
    const PageData = await getServerSideProps("pages/purchasing-process", params.locale);
    const CTAData = await getServerSideProps("components/cta", params.locale);

    return <PurchasingProcess data={PageData.props.data.data} NeedHelpComp={CTAData.props.data.data.extra_content} />;
}

