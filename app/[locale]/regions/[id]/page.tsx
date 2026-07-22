import { getServerSideProps } from "@/_components/api/general";
import GridCategory from "@/_components/Homepage/GridCategory";

export default async function RegionPropertiesPage({ params }: { params: { locale: string, id: string } }) {
    const { locale, id } = params;

    const realId = id.split('-')[0]; 

    const propertiesData = await getServerSideProps(
        `properties?filter[location_id]=${realId}&timestamp=${Date.now()}`, 
        locale
    );
    const properties = propertiesData?.props?.data?.data || [];

    // Fetch filter dropdown data in parallel
    const [categoriesRes, conditionsRes, energiesRes, regionsRes] = await Promise.all([
        getServerSideProps('properties/categories', locale),
        getServerSideProps('properties/conditions', locale),
        getServerSideProps('properties/energies', locale),
        getServerSideProps('properties/regions', locale),
    ]);

    const categories = categoriesRes?.props?.data?.data || [];
    const conditions = conditionsRes?.props?.data?.data || [];
    const energies = energiesRes?.props?.data?.data || [];
    const regions = regionsRes?.props?.data?.data || [];

    const matchedRegion = regions.find((r: any) => String(r.id) === String(realId));
    const regionName = matchedRegion?.name || '';

    // Listing API has no specs — fetch each property's detail to get specs
    const enrichedProperties = await Promise.all(
        properties.map(async (property: any) => {
            try {
                const detail = await getServerSideProps(`properties/${property.slug}`, locale);
                const detailData = detail?.props?.data?.data;
                return {
                    ...property,
                    specs: detailData?.specs || null,
                    region: detailData?.region || property.region || null,
                    category: detailData?.category || property.category || null,
                    description: detailData?.description || property.description || null,
                    code: detailData?.code || property.code || null,
                };
            } catch {
                return property;
            }
        })
    );

    return (
        <main className="bg-white min-h-screen">
            <GridCategory 
                properties={enrichedProperties} 
                locale={locale}
                categories={categories}
                conditions={conditions}
                energies={energies}
                regions={regions}
                regionName={regionName}
                breadcrumbs={[
                    { label: locale === 'ar' ? 'المناطق' : 'Regions' },
                    { label: regionName || '' },
                ]}
            />
        </main>
    );
}

