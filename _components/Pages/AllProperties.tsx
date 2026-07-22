'use client'
import { fetchFilteredProperties } from '@/lib/Filter'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import NeedHelp, { NeedHelpProps } from '../Common/NeedHelp'
import Filter from '../Common/Properties/filter'
import PropertyWidget from '../Common/Properties/PropertyWidget'
import { RegionsWidget } from '../Homepage/Regions'
import { useTranslations } from 'next-intl'

interface Props {
    AllPropertiesData: any[],
    NeedHelpComp: NeedHelpProps,
    locationsData: RegionsWidget[],
    CategoriesData: { id: number, name: string }[],
    ConditionsData: { id: number, name: string }[],
    EnergyData: { id: number, name: string }[]
}

export default function AllProperties({ AllPropertiesData, NeedHelpComp, locationsData, CategoriesData, ConditionsData, EnergyData }: Props) {
    const searchParams = useSearchParams();
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const [properties, setProperties] = useState<any[]>(AllPropertiesData);
    const [selectedLocation, setSelectedLocation] = useState<{ id: number; name: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string }[]>([]);
    const [selectedCondition, setSelectedCondition] = useState<{ id: number; name: string }[]>([]);
    const [selectedEnergy, setSelectedEnergy] = useState<{ id: number; name: string }[]>([]);
    const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
    const [selectedBedrooms, setSelectedBedrooms] = useState<number[]>([])
    const [selectedBathrooms, setSelectedBathrooms] = useState<number[]>([])
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [appliedPrice, setAppliedPrice] = useState<{ min: string; max: string }>({ min: '', max: '' });
    const [openFilter, setOpenFilter] = useState<string | null>(null);


    useEffect(() => {
        const keyword = selectedKeyword?.trim();
        const hasNumbers = keyword ? /\d/.test(keyword) : false;

        const filters: any = {
            locationIds: selectedLocation.map((loc) => loc.id),
            categoryIds: selectedCategory.map((category) => category.id),
            conditionIds: selectedCondition.map((condition) => condition.id),
            energyIds: selectedEnergy.map((energy) => energy.id),
            bedrooms: selectedBedrooms,
            bathrooms: selectedBathrooms,
        };
        if (appliedPrice.min || appliedPrice.max) {
            filters.priceMin = appliedPrice.min ? Number(appliedPrice.min) : undefined;
            filters.priceMax = appliedPrice.max ? Number(appliedPrice.max) : undefined;
        }


        if (keyword && keyword.length >= 4) {
            if (hasNumbers) {
                filters.code = keyword;
            } else {
                filters.title = keyword;
            }
        }

        const getFilteredProperties = async () => {
            try {
                const res = await fetchFilteredProperties(filters);
                setProperties(res.data);
            } catch (err) {
                console.error('Error fetching filtered properties:', err);
            }
        };

        if (
            selectedLocation.length > 0 ||
            selectedCategory.length > 0 ||
            selectedCondition.length > 0 ||
            (selectedKeyword && selectedKeyword.length >= 4) ||
            selectedBedrooms.length > 0 ||
            selectedBathrooms.length > 0 ||
            appliedPrice.min ||
            appliedPrice.max
        ) {
            getFilteredProperties();
        } else {
            setProperties(AllPropertiesData);
        }
    }, [
        selectedLocation,
        selectedCategory,
        selectedCondition,
        selectedEnergy,
        selectedBedrooms,
        selectedBathrooms,
        selectedKeyword,
        appliedPrice
    ]);

    // ✅ Move this outside the first useEffect
    useEffect(() => {
        const handleFilterUpdate = async () => {
            const filters = {
                locationIds: selectedLocation.map((loc) => loc.id),
                categoryIds: selectedCategory.map((category) => category.id),
                conditionIds: selectedCondition.map((condition) => condition.id),
                energyIds: selectedEnergy.map((energy) => energy.id),
                bedroomIds: selectedBedrooms,
                bathroomIds: selectedBathrooms,
            };

            try {
                const res = await fetchFilteredProperties(filters);
                setProperties(res.data);
            } catch (err) {
                console.error('Error fetching filtered properties:', err);
            }
        };

        window.addEventListener('filter-updated', handleFilterUpdate);
        return () => window.removeEventListener('filter-updated', handleFilterUpdate);
    }, [selectedBedrooms, selectedBathrooms]);

    const handleApplyPrice = () => {
        setAppliedPrice(priceRange);
    };

    const handleResetPrice = () => {
        setPriceRange({ min: '', max: '' });
        setAppliedPrice({ min: '', max: '' });
    };

    useEffect(() => {
        if (!searchParams) return;

        // ✅ Start loading
        const hasQueryParams =
            searchParams.get("keyword") ||
            searchParams.get("locations") ||
            searchParams.get("categories") ||
            searchParams.get("minPrice") ||
            searchParams.get("maxPrice");

        if (!hasQueryParams) return; // No need to fetch or show loader if no params

        setLoading(true); // ⬅️ start loading

        const keyword = searchParams.get("keyword");
        const locationIds = searchParams.get("locations");
        const categoryIds = searchParams.get("categories");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");

        if (keyword) setSelectedKeyword(keyword);

        if (locationIds) {
            const ids = locationIds.split(",").map(Number);
            const selected = locationsData.filter((loc) => ids.includes(loc.id));
            setSelectedLocation(selected);
        }

        if (categoryIds) {
            const ids = categoryIds.split(",").map(Number);
            const selected = CategoriesData.filter((cat) => ids.includes(cat.id));
            setSelectedCategory(selected);
        }

        if (minPrice || maxPrice) {
            setPriceRange({
                min: minPrice || "",
                max: maxPrice || "",
            });
            setAppliedPrice({
                min: minPrice || "",
                max: maxPrice || "",
            });
        }

        const filters: any = {
            locationIds: locationIds ? locationIds.split(",").map(Number) : [],
            categoryIds: categoryIds ? categoryIds.split(",").map(Number) : [],
            priceMin: minPrice ? Number(minPrice) : undefined,
            priceMax: maxPrice ? Number(maxPrice) : undefined,
            title: keyword && !/\d/.test(keyword) ? keyword : undefined,
            code: keyword && /\d/.test(keyword) ? keyword : undefined,
        };

        const fetchInitialProperties = async () => {
            try {
                const res = await fetchFilteredProperties(filters);
                setProperties(res.data);
            } catch (err) {
                console.error("Error fetching initial filtered properties:", err);
            } finally {
                setLoading(false); // ⬅️ stop loading
            }
        };

        fetchInitialProperties();
    }, [searchParams]);



    return (
        <>
            {/* <Morefilters isOpen={moreFilterset} CloseFunction={() => setMoreFilter(!moreFilterset)}>
                <Filter
                    Locations={locationsData}
                    Categories={CategoriesData}
                    Conditions={ConditionsData}
                    Energies={EnergyData}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedCondition={selectedCondition}
                    setSelectedCondition={setSelectedCondition}
                    selectedEnergy={selectedEnergy}
                    setSelectedEnergy={setSelectedEnergy}
                    selectedKeyword={selectedKeyword}
                    setSelectedKeyword={setSelectedKeyword}
                    selectedBedrooms={selectedBedrooms}
                    setSelectedBedrooms={setSelectedBedrooms}
                    selectedBathrooms={selectedBathrooms}
                    setSelectedBathrooms={setSelectedBathrooms}
                    openFilter={openFilter}
                    setOpenFilter={setOpenFilter}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    onApplyPrice={handleApplyPrice}
                    onResetPrice={handleResetPrice}
                    moreFilter
                    onClickMore={() => setMoreFilter(!moreFilterset)}
                />
            </Morefilters> */}
            <div className='max-w-[1424px] px-4 mx-auto py-[60px] space-y-10'>
                <div className=' lg:overflow-visible overflow-x-scroll noScrollBar'>
                    <Filter
                        Locations={locationsData}
                        Categories={CategoriesData}
                        Conditions={ConditionsData}
                        Energies={EnergyData}
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedCondition={selectedCondition}
                        setSelectedCondition={setSelectedCondition}
                        selectedEnergy={selectedEnergy}
                        setSelectedEnergy={setSelectedEnergy}
                        selectedKeyword={selectedKeyword}
                        setSelectedKeyword={setSelectedKeyword}
                        selectedBedrooms={selectedBedrooms}
                        setSelectedBedrooms={setSelectedBedrooms}
                        selectedBathrooms={selectedBathrooms}
                        setSelectedBathrooms={setSelectedBathrooms}
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        onApplyPrice={handleApplyPrice}
                        onResetPrice={handleResetPrice}
                    />
                </div>


                <div>
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
                        </div>
                    ) : properties.length > 0 ? (
                        <div className='flex md:gap-4 gap-6 flex-wrap'>
                            {properties.map((item, index) => (
                                <div
                                    className='2xl:w-[calc(100%/4-12px)] lg:w-[calc(100%/3-11px)] md:w-[calc(50%-8px)] w-full pb-[30px]'
                                    key={index}
                                >
                                    <PropertyWidget data={item} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">{t("filter.no_properties")}</p>
                    )}
                </div>



            </div>
            <NeedHelp data={NeedHelpComp} />
        </>

    )
}
