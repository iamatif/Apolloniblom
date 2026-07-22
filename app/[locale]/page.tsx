import { getServerSideProps } from "@/_components/api/general";
import Homepage from "@/_components/Pages/Homepage";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    // Agar SEO data na mile toh ye crash nahi karega
    try {
        return await generatePageMetadata("pages/home", locale);
    } catch (e) {
        return { title: "Apolloni & Blom" };
    }
}

export default async function Page({ params }: { params: { locale: string } }) {
    // Data fetch kar rahe hain
    const PageData = await getServerSideProps("pages/home", params.locale);
    const CTAData = await getServerSideProps("components/cta", params.locale);
    const BlogsData = await getServerSideProps(`blogs?limit=3`, params.locale);
    const AllFaqs = await getServerSideProps("faqs?filter[show_on_home]=1", params.locale);
    const allRegions = await getServerSideProps("properties/regions", params.locale);
    const allProperties = await getServerSideProps("properties", params.locale);
    const Locations = await getServerSideProps("properties/regions", params.locale);
    const Categories = await getServerSideProps("properties/categories", params.locale);

    return (
        <Homepage
            // ?. lagane se agar data nahi milega toh undefined return hoga, crash nahi
            data={PageData?.props?.data?.data?.extra_content || {}}
            NeedHelpComp={CTAData?.props?.data?.data?.extra_content || {}}
            Blogs={BlogsData?.props?.data?.data || []}
            AllFaqsData={AllFaqs?.props?.data?.data || []}
            AllRegionsData={allRegions?.props?.data?.data || []}
            AllPropertiesData={allProperties?.props?.data?.data || []}
            Locations={Locations?.props?.data?.data || []}
            Categories={Categories?.props?.data?.data || []}
        />
    );
}