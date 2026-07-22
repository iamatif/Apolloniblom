"use client";
import { useTranslations } from 'next-intl'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Area from '../SVGs/Area'
import Bathrooms from '../SVGs/Bathrooms'
import Bedrooms from '../SVGs/Bedrooms'
import Region from '../SVGs/Region'
import Surface from '../SVGs/Surface' 
import Home from '../SVGs/Home'
import Arrow from '../SVGs/Arrow'
import { fetchFilteredProperties } from '@/lib/Filter';

const PRICE_OPTIONS_MIN = [
    { value: '', label: 'Min Price' },
    { value: '1', label: 'from 0' },
    { value: '100000', label: '100,000' },
    { value: '200000', label: '200,000' },
    { value: '300000', label: '300,000' },
    { value: '400000', label: '400,000' },
    { value: '500000', label: '500,000' },
    { value: '600000', label: '600,000' },
    { value: '700000', label: '700,000' },
    { value: '800000', label: '800,000' },
    { value: '900000', label: '900,000' },
    { value: '1000000', label: '1,000,000' },
    { value: '1500000', label: '1,500,000' },
    { value: '2000000', label: '2,000,000' },
    { value: '2500000', label: '2,500,000' },
    { value: '3000000', label: '3,000,000' },
    { value: '3500000', label: '3,500,000' },
    { value: '4000000', label: '4,000,000' },
    { value: '4500000', label: '4,500,000' },
    { value: '5000000', label: '5,000,000' },
    { value: '10000000', label: '10,000,000' },
];

const PRICE_OPTIONS_MAX = [
    { value: '', label: 'Max Price' },
    { value: '100000', label: '100,000' },
    { value: '200000', label: '200,000' },
    { value: '300000', label: '300,000' },
    { value: '400000', label: '400,000' },
    { value: '500000', label: '500,000' },
    { value: '600000', label: '600,000' },
    { value: '700000', label: '700,000' },
    { value: '800000', label: '800,000' },
    { value: '900000', label: '900,000' },
    { value: '1000000', label: '1,000,000' },
    { value: '1500000', label: '1,500,000' },
    { value: '2000000', label: '2,000,000' },
    { value: '2500000', label: '2,500,000' },
    { value: '3000000', label: '3,000,000' },
    { value: '3500000', label: '3,500,000' },
    { value: '4000000', label: '4,000,000' },
    { value: '4500000', label: '4,500,000' },
    { value: '5000000', label: '5,000,000' },
    { value: '10000000', label: '10,000,000' },
    { value: '99999999', label: 'No limit' },
];

const SURFACE_OPTIONS = [
    { value: '', label: 'Surface' },
    { value: '1', label: 'from 0' },
    { value: '50', label: 'From 50 Sqm' },
    { value: '100', label: 'From 100 Sqm' },
    { value: '200', label: 'From 200 Sqm' },
    { value: '300', label: 'From 300 Sqm' },
    { value: '400', label: 'From 400 Sqm' },
    { value: '500', label: 'From 500 Sqm' },
    { value: '700', label: 'From 700 Sqm' },
    { value: '1000', label: 'From 1,000 Sqm' },
    { value: '2000', label: 'From 2,000 Sqm' },
    { value: '3000', label: 'From 3,000 Sqm' },
];

const SURFACE_MAX_OPTIONS = [
    { value: '', label: 'Surface max' },
    { value: '50', label: 'to 50 Sqm' },
    { value: '100', label: 'to 100 Sqm' },
    { value: '200', label: 'to 200 Sqm' },
    { value: '300', label: 'to 300 Sqm' },
    { value: '400', label: 'to 400 Sqm' },
    { value: '500', label: 'to 500 Sqm' },
    { value: '700', label: 'to 700 Sqm' },
    { value: '1000', label: 'to 1,000 Sqm' },
    { value: '2000', label: 'to 2,000 Sqm' },
    { value: '3000', label: 'to 3,000 Sqm' },
    { value: '99999999', label: 'No limit' },
];

const LAND_OPTIONS = [
    { value: '', label: 'Land min' },
    { value: '1', label: 'from 0' },
    { value: '5000', label: 'From 5,000 Sqm' },
    { value: '10000', label: 'From 1 Ha' },
    { value: '50000', label: 'From 5 Ha' },
    { value: '100000', label: 'From 10 Ha' },
    { value: '200000', label: 'From 20 Ha' },
    { value: '300000', label: 'From 30 Ha' },
    { value: '400000', label: 'From 40 Ha' },
    { value: '700000', label: 'From 70 Ha' },
    { value: '1000000', label: 'From 100 Ha' },
];

const LAND_MAX_OPTIONS = [
    { value: '', label: 'Land max' },
    { value: '5000', label: 'to 5,000 Sqm' },
    { value: '10000', label: 'to 1 Ha' },
    { value: '50000', label: 'to 5 Ha' },
    { value: '100000', label: 'to 10 Ha' },
    { value: '200000', label: 'to 20 Ha' },
    { value: '300000', label: 'to 30 Ha' },
    { value: '400000', label: 'to 40 Ha' },
    { value: '700000', label: 'to 70 Ha' },
    { value: '1000000', label: 'to 100 Ha' },
    { value: '999999999', label: 'No limit' },
];

const BEDROOM_OPTIONS = [
    { value: '', label: 'Bedrooms' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '999999999', label: 'No limit' },
];

const SORT_OPTIONS = [
    { value: '', label: 'Sort' },
    { value: 'price:ASC', label: 'Rising price' },
    { value: 'price:DESC', label: 'Descending price' },
    { value: 'title:ASC', label: 'Title A-Z' },
    { value: 'title:DESC', label: 'Title Z-A' },
    { value: 'data:ASC', label: 'Oldest to newest' },
    { value: 'data:DESC', label: 'Newest to oldest' },
];

const inputClass = "w-full border border-[#C1A87D]/40 p-2.5 text-gray-500 text-[14px] bg-white outline-none focus:border-black transition-all";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface GridCategoryProps {
    properties?: any[];
    locale: string;
    categories?: { id: number; name: string }[];
    conditions?: { id: number; name: string }[];
    energies?: { id: number; name: string }[];
    regions?: { id: number; name: string }[];
    regionName?: string;
    breadcrumbs?: BreadcrumbItem[];
}

export default function GridCategory({ properties = [], locale, categories = [], conditions = [], energies = [], regions = [], regionName, breadcrumbs }: GridCategoryProps) {
    const t = useTranslations();
    const router = useRouter();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [recentProperties, setRecentProperties] = useState<any[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<any[]>(properties);
    const [isSearching, setIsSearching] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const itemsPerPage = 8;

    // Form state
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [energy, setEnergy] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [surfaceMin, setSurfaceMin] = useState('');
    const [surfaceMax, setSurfaceMax] = useState('');
    const [landMin, setLandMin] = useState('');
    const [landMax, setLandMax] = useState('');
    const [bedroomMin, setBedroomMin] = useState('');
    const [bedroomMax, setBedroomMax] = useState('');
    const [sort, setSort] = useState('');

    const getTranslated = (field: any) => {
        if (!field) return "";
        if (typeof field === 'object') return field[locale] || field['en'] || "";
        return field;
    };

    useEffect(() => {
        try {
            const saved = localStorage.getItem('recently_viewed_apolloni');
            if (saved) {
                setRecentProperties(JSON.parse(saved).slice(0, 5));
            }
        } catch (e) {
            console.error("Error loading history", e);
        }
    }, []);

    useEffect(() => {
        setFilteredProperties(properties);
        setCurrentPage(1);
    }, [properties]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        try {
            const filters: any = {};
            if (keyword) {
                if (/\d/.test(keyword)) {
                    filters.code = keyword;
                } else {
                    filters.title = keyword;
                }
            }
            if (category) filters.categoryIds = [Number(category)];
            if (condition) filters.conditionIds = [Number(condition)];
            if (energy) filters.energyIds = [Number(energy)];
            if (priceMin) filters.priceMin = Number(priceMin);
            if (priceMax) filters.priceMax = Number(priceMax);
            if (surfaceMin) filters.surfaceMin = Number(surfaceMin);
            if (surfaceMax) filters.surfaceMax = Number(surfaceMax);
            if (landMin) filters.landMin = Number(landMin);
            if (landMax) filters.landMax = Number(landMax);
            if (bedroomMin) filters.bedroomMin = Number(bedroomMin);
            if (bedroomMax) filters.bedroomMax = Number(bedroomMax);
            if (sort) filters.sort = sort;

            const res = await fetchFilteredProperties(filters);
            const results = res.data || [];

            // Enrich results with specs/code/description from single property API
            const enriched = await Promise.all(
                results.map(async (property: any) => {
                    try {
                        const detailRes = await fetch(
                            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/properties/${property.slug}`,
                            { headers: { 'Accept': 'application-json', 'Content-Language': locale } }
                        );
                        const detailJson = await detailRes.json();
                        const d = detailJson?.data;
                        return {
                            ...property,
                            specs: d?.specs || null,
                            region: d?.region || property.region || null,
                            category: d?.category || property.category || null,
                            description: d?.description || null,
                            code: d?.code || null,
                        };
                    } catch {
                        return property;
                    }
                })
            );

            setFilteredProperties(enriched);
            setCurrentPage(1);
        } catch (err) {
            console.error('Search error:', err);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSort = (props: any[], sortVal: string) => {
        if (!sortVal) return props;
        const [field, dir] = sortVal.split(':');
        const sorted = [...props];
        sorted.sort((a, b) => {
            let valA = '';
            let valB = '';
            if (field === 'price') {
                valA = String(a?.price || '').replace(/[^0-9]/g, '');
                valB = String(b?.price || '').replace(/[^0-9]/g, '');
                const numA = Number(valA) || 0;
                const numB = Number(valB) || 0;
                return dir === 'ASC' ? numA - numB : numB - numA;
            } else if (field === 'title') {
                valA = getTranslated(a?.title).toLowerCase();
                valB = getTranslated(b?.title).toLowerCase();
                return dir === 'ASC' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            } else if (field === 'data') {
                valA = String(a?.id || 0);
                valB = String(b?.id || 0);
                return dir === 'ASC' ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
            }
            return 0;
        });
        return sorted;
    };

    const handleReset = () => {
        setKeyword('');
        setCategory('');
        setCondition('');
        setEnergy('');
        setPriceMin('');
        setPriceMax('');
        setSurfaceMin('');
        setSurfaceMax('');
        setLandMin('');
        setLandMax('');
        setBedroomMin('');
        setBedroomMax('');
        setSort('');
        setFilteredProperties(properties);
        setCurrentPage(1);
    };

    const sortedProperties = handleSort(filteredProperties, sort);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProperties = sortedProperties.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
    
    return (
        <div className="max-w-[1392px] mx-auto py-12 px-4 text-start ">
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="mb-8">
                    <div className="flex items-center gap-2">
                        <Link href={`/${locale}`} className="text-black w-6 h-6">
                            <Home />
                        </Link>
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={index}>
                                <span className="w-4 h-4 text-black rtl:rotate-180">
                                    <Arrow />
                                </span>
                                {crumb.href ? (
                                    <Link href={crumb.href} className="text-[#C1A87D] text-sm font-semibold">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <p className="text-[#C1A87D] text-sm font-bold line-clamp-1">
                                        {crumb.label}
                                    </p>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </nav>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* --- LEFT SIDE: PROPERTY LIST --- */}
                <div className="lg:col-span-8 space-y-16">
                    {isSearching ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-4 border-gray-300 border-t-[#C1A87D] rounded-full animate-spin" />
                        </div>
                    ) : (!filteredProperties || filteredProperties.length === 0) ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <svg className="w-16 h-16 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {regionName && properties.length === 0 ? (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-800 uppercase mb-3">No Properties in This Region</h2>
                                    <p className="text-gray-500 mb-8 text-sm max-w-md leading-relaxed">
                                        We don't have any properties available in {regionName} at this time. Please check back later or explore other regions.
                                    </p>
                                    <div className="flex gap-3">
                                        <Link href={`/${locale}/properties`} className="bg-[#C1A87D] text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-sm">
                                            View All Properties
                                        </Link>
                                        <Link href={`/${locale}`} className="border border-gray-300 text-gray-600 px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:border-black hover:text-black transition-all">
                                            Go Back
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-800 uppercase mb-3">No Properties Found</h2>
                                    <p className="text-gray-500 mb-8 text-sm max-w-md leading-relaxed">
                                        We couldn't find any properties matching your current filters. Try adjusting your search criteria or reset filters to see all available properties.
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleReset}
                                            className="bg-[#C1A87D] text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-sm"
                                        >
                                            Reset Filters
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        currentProperties.map((item, index) => {
                            const displayTitle = getTranslated(item?.title);
                            const displayDescription = getTranslated(item?.description);
                            const displayCategory = getTranslated(item?.category?.name || item?.category?.title);
                                const itemRegionName = item?.region?.name || "TOSCANA";

                            const clampDescription = (html: string, wordLimit = 40) => {
                                const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
                                const words = text.split(' ');
                                if (words.length <= wordLimit) return text;
                                return words.slice(0, wordLimit).join(' ') + '...';
                            };

                            const cleanPrice = String(item?.price || "").replace(/[^0-9]/g, '');
                            const isPriceZero = !item?.price || Number(cleanPrice) === 0;

                            return (
                                <div key={item.id || index} className="group space-y-5 pb-12 border-b border-gray-100 last:border-0">
                                    
                                    <Link href={`/${locale}/properties/${item?.slug}`} className="relative block h-[300px] md:h-[450px] w-full overflow-hidden rounded-sm bg-gray-100">
                                        <Image 
                                            src={item?.image?.src || item?.gallery?.[0]?.src || "/placeholder.jpg"} 
                                            alt={displayTitle} 
                                            fill 
                                            className="object-cover group-hover:scale-105 transition-all duration-1000"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </Link>

                                    {item?.code && (
                                        <h2 className='bg-[#F5F0E8] p-1.5 text-gray-500 font-light w-fit flex gap-1 text-sm'>
                                            {t("singleProperty.property_code")}
                                            <span className='font-semibold inline-block text-[#1A1A1A]'>{item.code}</span>
                                        </h2>
                                    )}

                                    <div className="space-y-1">
                                        <Link href={`/${locale}/properties/${item?.slug}`}>
                                            <h2 className="text-[#1A1A1A] text-[28px] md:text-[36px] font-bold capitalize leading-tight hover:text-[#C1A87D] transition-colors">
                                                {displayTitle}
                                            </h2>
                                        </Link>
                                        <p className="text-[#C1A87D] text-xl md:text-2xl font-bold py-1">
                                            {isPriceZero ? (locale === 'ar' ? "السعر عند الطلب" : "Price On Request") : item.price}
                                        </p>
                                    </div>

                                    <div className='flex gap-x-8 gap-y-4 items-center flex-wrap py-2'>
                                        {item?.region?.name && (
                                            <div className='flex text-gray-600 text-sm items-center gap-1 font-light'>
                                                <span className='w-5 h-5'><Region /></span>
                                                <span className='whitespace-nowrap'>{item.region.name}</span>
                                            </div>
                                        )}

                                        {item?.specs?.bedrooms && (
                                            <div className='flex text-gray-600 text-sm items-center gap-1 font-light'>
                                                <span className='w-5 h-5'><Bedrooms /></span>
                                                <span className='whitespace-nowrap'>{item.specs.bedrooms} {t("singleProperty.bedrooms")}</span>
                                            </div>
                                        )}

                                        {item?.specs?.bathrooms && (
                                            <div className='flex text-gray-600 text-sm items-center gap-1 font-light'>
                                                <span className='w-5 h-5'><Bathrooms /></span>
                                                <span className='whitespace-nowrap'>{item.specs.bathrooms} {t("singleProperty.bathroom")}</span>
                                            </div>
                                        )}

                                        {item?.specs?.surface && (
                                            <div className='flex text-gray-600 text-sm items-center gap-1 font-light'>
                                                <span className='w-5 h-5'><Surface /></span>
                                                <span className='whitespace-nowrap'>{item.specs.surface} {t("singleProperty.Sqm_Surface")}</span>
                                            </div>
                                        )}

                                        {item?.specs?.area && (
                                            <div className='flex text-gray-600 text-sm items-center gap-1 font-light'>
                                                <span className='w-5 h-5'><Area /></span>
                                                <span className='whitespace-nowrap'>{item.specs.area} {t("singleProperty.Sqm_Residential_area")}</span>
                                            </div>
                                        )}
                                    </div>

                                    {displayDescription && (
                                        <p className="text-gray-600 text-sm leading-relaxed font-light max-w-[95%]">
                                            {clampDescription(displayDescription)}
                                        </p>
                                    )}

                                    <Link href={`/${locale}/properties/${item?.slug}`} className="bg-[#C1A87D] text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all inline-block shadow-sm">
                                        {locale === 'ar' ? "مزيد من المعلومات" : "More Information"}
                                    </Link>
                                </div>
                            );
                        })
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 pt-10">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                <button 
                                    key={n} 
                                    onClick={() => {
                                        setCurrentPage(n);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }} 
                                    className={`w-9 h-9 rounded-full border text-[11px] font-bold transition-all ${currentPage === n ? "bg-black text-white border-black" : "bg-white text-gray-400 hover:border-black"}`}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* --- RIGHT SIDEBAR --- */}
                <aside className="lg:col-span-4 space-y-8 h-fit lg:sticky top-10">
                    {/* Search Form */}
                    <div className="bg-white p-6 border border-[#C1A87D]/30 shadow-sm">
                        <h3 className="text-[#C1A87D] text-lg font-bold uppercase tracking-widest mb-6">Search</h3>
                        <form onSubmit={handleSearch} className="flex flex-col gap-3">
                            {/* --- ALWAYS VISIBLE (6 fields) --- */}
                            <input
                                type="text"
                                name="word"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Keyword / Code"
                                className={inputClass}
                            />

                            <select
                                name="categoria"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>

                            <select
                                name="stato"
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Condition</option>
                                {conditions.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>

                            <div className="grid grid-cols-2 gap-2">
                                <select
                                    name="min_price"
                                    value={priceMin}
                                    onChange={(e) => setPriceMin(e.target.value)}
                                    className={inputClass}
                                >
                                    {PRICE_OPTIONS_MIN.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                <select
                                    name="max_price"
                                    value={priceMax}
                                    onChange={(e) => setPriceMax(e.target.value)}
                                    className={inputClass}
                                >
                                    {PRICE_OPTIONS_MAX.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            <select
                                name="ordine"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className={inputClass}
                            >
                                {SORT_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>

                            {/* --- HIDDEN BEHIND SHOW MORE --- */}
                            {showMore && (
                                <>
                                    <select
                                        name="class_en"
                                        value={energy}
                                        onChange={(e) => setEnergy(e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Energy Rating (all)</option>
                                        {energies.map((e) => (
                                            <option key={e.id} value={e.id}>{e.name}</option>
                                        ))}
                                    </select>

                                    <div className="grid grid-cols-2 gap-2">
                                        <select
                                            name="surface_from"
                                            value={surfaceMin}
                                            onChange={(e) => setSurfaceMin(e.target.value)}
                                            className={inputClass}
                                        >
                                            {SURFACE_OPTIONS.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                        <select
                                            name="surface_to"
                                            value={surfaceMax}
                                            onChange={(e) => setSurfaceMax(e.target.value)}
                                            className={inputClass}
                                        >
                                            {SURFACE_MAX_OPTIONS.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <select
                                            name="land_from"
                                            value={landMin}
                                            onChange={(e) => setLandMin(e.target.value)}
                                            className={inputClass}
                                        >
                                            {LAND_OPTIONS.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                        <select
                                            name="land_to"
                                            value={landMax}
                                            onChange={(e) => setLandMax(e.target.value)}
                                            className={inputClass}
                                        >
                                            {LAND_MAX_OPTIONS.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <select
                                            name="room_from"
                                            value={bedroomMin}
                                            onChange={(e) => setBedroomMin(e.target.value)}
                                            className={inputClass}
                                        >
                                            {BEDROOM_OPTIONS.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.value === '' ? 'Bedrooms min' : `From ${opt.label} Bedroom${opt.value !== '999999999' && opt.value !== '' ? 's' : ''}`}</option>
                                            ))}
                                        </select>
                                        <select
                                            name="room_to"
                                            value={bedroomMax}
                                            onChange={(e) => setBedroomMax(e.target.value)}
                                            className={inputClass}
                                        >
                                            {BEDROOM_OPTIONS.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.value === '' ? 'Bedrooms max' : opt.value === '999999999' ? 'No limit' : `to ${opt.label} Bedroom${Number(opt.value) > 1 ? 's' : ''}`}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}

                            {/* Show more / less toggle */}
                            <button
                                type="button"
                                onClick={() => setShowMore(!showMore)}
                                className="text-[#C1A87D] text-[10px] font-bold uppercase tracking-widest py-1 hover:text-black transition-all text-left"
                            >
                                {showMore ? '− Show less options' : '+ Show more options'}
                            </button>

                            <button
                                type="submit"
                                disabled={isSearching}
                                className="w-full bg-[#C1A87D] text-white py-3.5 flex justify-center items-center hover:bg-black transition-all disabled:opacity-50"
                            >
                                {isSearching ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="w-full text-[#C1A87D] text-sm font-bold uppercase tracking-widest py-2 hover:text-black transition-all"
                            >
                                Reset Filters
                            </button>
                        </form>
                    </div>

                    {/* Recently Viewed */}
                    {recentProperties.length > 0 && (
                        <div className="bg-white p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-[#C1A87D] text-lg font-bold uppercase tracking-widest mb-6">Recently Viewed</h3>
                            <div className="space-y-5">
                                {recentProperties.map((prop, i) => (
                                    <Link href={`/${locale}/properties/${prop.slug}`} key={i} className="flex gap-4 group">
                                        <div className="relative w-12 h-12 shrink-0 overflow-hidden bg-gray-50 rounded-sm">
                                            <img 
                                                src={prop.image?.src || prop.image || "/placeholder.jpg"} 
                                                className="object-cover w-full h-full group-hover:scale-110 transition-all" 
                                                alt="" 
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center overflow-hidden">
                                            <h4 className="text-[12px] font-bold text-gray-800 uppercase truncate group-hover:text-[#C1A87D]">
                                                {getTranslated(prop.title)}
                                            </h4>
                                            <p className="text-[12px] text-[#C1A87D] font-bold">{prop.price}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="bg-white p-6 border border-gray-100 shadow-sm">
                        <h3 className="text-[#C1A87D] text-lg font-bold uppercase tracking-widest mb-6">User Login</h3>
                        <ul className="text-[14px] space-y-4 font-bold text-gray-500 uppercase tracking-widest">
                            <li className="hover:text-black cursor-pointer border-b border-gray-50 pb-2">Login</li>
                            <li className="hover:text-black cursor-pointer border-b border-gray-50 pb-2">Forgotten Password</li>
                            <li className="hover:text-black cursor-pointer font-bold text-[#C1A87D]">Registered</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
