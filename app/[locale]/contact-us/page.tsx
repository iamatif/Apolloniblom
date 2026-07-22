import { getServerSideProps } from "@/_components/api/general";
import ContactUs from "@/_components/Pages/ContactUs";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
export const runtime = "edge";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    return generatePageMetadata("pages/contact-us", locale);
}

export default async function Page({ params }: { params: { locale: string } }) {
    const PageData = await getServerSideProps("pages/contact-us", params.locale);

    return <ContactUs data={PageData.props.data.data}  />;
}

