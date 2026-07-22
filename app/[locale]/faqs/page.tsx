import { getServerSideProps } from "@/_components/api/general";
import Faqs from "@/_components/Pages/Faqs";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
export const runtime = "edge";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    return generatePageMetadata("pages/frequently-asked-questions", locale);
}

export default async function Page({ params }: { params: { locale: string } }) {
    const PageData = await getServerSideProps("pages/frequently-asked-questions", params.locale);
    const CTAData = await getServerSideProps("components/cta", params.locale);
    const AllFaqs = await getServerSideProps("faqs", params.locale);


    return <Faqs data={PageData.props.data.data} NeedHelpComp={CTAData.props.data.data.extra_content} AllFaqsData={AllFaqs.props.data.data} />;
}

