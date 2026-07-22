import { getServerSideProps } from "@/_components/api/general";
import Blogs from "@/_components/Pages/Blogs";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
export const runtime = "edge";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    return generatePageMetadata("pages/blogs", locale);
}

export default async function Page({ params }: { params: { locale: string } }) {
    const PageData = await getServerSideProps("pages/blogs", params.locale);
    const CTAData = await getServerSideProps("components/cta", params.locale);
    const AllBlogs = await getServerSideProps("blogs", params.locale);


    return <Blogs data={PageData.props.data.data} NeedHelpComp={CTAData.props.data.data.extra_content} AllBlogsData={AllBlogs.props.data.data} />;
}

