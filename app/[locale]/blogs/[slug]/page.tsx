import { getServerSideProps } from "@/_components/api/general";
import SingleMedia from "@/_components/Pages/SingleMedia";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { slug: string, locale: string };
}): Promise<Metadata> {
    return generatePageMetadata(`blogs/${slug}`, locale);
}

export default async function Page({ params }: { params: { slug: string, locale: string } }) {
    const SingleBlogData = await getServerSideProps(`blogs/${params.slug}`, params.locale);
    const BlogsData = await getServerSideProps(`blogs?filter[excluded_id]=${SingleBlogData.props.data.data.id}&limit=3`, params.locale)
    return <SingleMedia
        data={SingleBlogData.props.data.data}
        Blogs={BlogsData.props.data.data}
    />;
}

