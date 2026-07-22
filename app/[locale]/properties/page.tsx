import { getServerSideProps } from "@/_components/api/general";
import AllProperties from "@/_components/Pages/AllProperties";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
export const runtime = "edge";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    return generatePageMetadata("pages/properties-list", locale);
}

export default async function Page({ params }: { params: { locale: string } }) {
    const allProperties = await getServerSideProps("properties", params.locale)
    const CTAData = await getServerSideProps("components/cta", params.locale);
    const Locations = await getServerSideProps("properties/regions", params.locale);
    const Categories = await getServerSideProps("properties/categories", params.locale);
    const Conditions = await getServerSideProps("properties/conditions", params.locale);
    const Energy = await getServerSideProps("properties/energies", params.locale);




    return (
        <AllProperties
            AllPropertiesData={allProperties.props.data.data}
            NeedHelpComp={CTAData.props.data.data.extra_content}
            locationsData={Locations.props.data.data}
            CategoriesData={Categories.props.data.data}
            ConditionsData={Conditions.props.data.data}
            EnergyData={Energy.props.data.data}
        />
    );
}

