'use client'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import BlogWidget, { BlogWidgetProps } from '../Common/BlogWidget'
import NeedHelp, { NeedHelpProps } from '../Common/NeedHelp'
import { PropertiesWidget } from '../Common/Properties/PropertyWidget'
import SingleFaq, { QuestionProps } from '../Common/SingleFaq'
import About, { AboutProps } from '../Homepage/About'
import Banners, { BannersProps } from '../Homepage/Banners'
import Hero, { HeroProps } from '../Homepage/Hero'
import Properties, { PropertiesProps } from '../Homepage/Properties'
import Regions, { RegionsProps, RegionsWidget } from '../Homepage/Regions'
import Services, { ServicesProps } from '../Homepage/Services'
import Arrowtwo from '../SVGs/Arrowtwo'

interface HomepageProps {
    hero: HeroProps,
    properties: PropertiesProps,
    region: RegionsProps,
    about: AboutProps,
    banner: BannersProps[],
    services: ServicesProps,
    faqs: {
        tagline: string,
        title: string,
        button: {
            text: string,
            link: string
        },
    },
    blogs: {
        title: string,
        button: {
            text: string,
            link: string
        }
    }
}

interface Props {
    data: HomepageProps,
    NeedHelpComp: NeedHelpProps,
    Blogs: BlogWidgetProps[],
    AllFaqsData: QuestionProps[],
    AllRegionsData: RegionsWidget[],
    AllPropertiesData: PropertiesWidget[],
    Locations: RegionsWidget[],
    Categories?: { id: number; name: string }[];
}

export default function Homepage({ data, NeedHelpComp, Blogs, AllFaqsData, AllRegionsData, AllPropertiesData, Locations, Categories }: Props) {
    const locale = useLocale();
    const [openfaq, setOpenfaq] = useState<number | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<{ id: number; name: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string }[]>([]);
    const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [appliedPrice, setAppliedPrice] = useState<{ min: string; max: string }>({ min: '', max: '' });
    const [openFilter, setOpenFilter] = useState<string | null>(null);

    const handleApplyPrice = () => {
        setAppliedPrice(priceRange);
    };

    const handleResetPrice = () => {
        setPriceRange({ min: '', max: '' });
        setAppliedPrice({ min: '', max: '' });
    };
    const handleClick = (index: number) => {
        setOpenfaq(index === openfaq ? null : index);
    };

    return (
        <div>
            <Hero
                data={data.hero}
                Locations={Locations}
                Categories={Categories}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedKeyword={selectedKeyword}
                setSelectedKeyword={setSelectedKeyword}
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                onApplyPrice={handleApplyPrice}
                onResetPrice={handleResetPrice}
            />
            <Properties data={data.properties} PropertiesWidgets={AllPropertiesData} />
            <Regions data={data.region} AllRegions={AllRegionsData} />
            <About data={data.about} />
            <Banners data={data.banner} />
            <Services data={data.services} />
            <div className='bg-Gold05 py-[60px] px-4'>
                <div className='max-w-[1000px] mx-auto space-y-10'>
                    <div className='space-y-2 text-center text-primary'>
                        <h2 className='md:text-lg text-base font-medium'>{data.faqs.tagline}</h2>
                        <h3 className='text-primary md:text-[42px] font-semibold md:leading-[55px] text-[28px]'>{data.faqs.title}</h3>
                    </div>
                    <div className="space-y-8">
                        {AllFaqsData.map((item, index) => (
                            <SingleFaq
                                Singlefaq={item}
                                openfaq={openfaq}
                                Lastone={AllFaqsData.length - 1 === index}
                                handleClick={handleClick}
                                key={index}
                                index={index}
                            />
                        ))}
                    </div>
                    <Link className='flex gap-3 items-center mx-auto text-base font-medium transition-all duration-500 w-fit text-Gold hover:text-primary' href={`${locale === "en" ? "" : "/ar"}${data.faqs.button.link}`}>
                        {data.faqs.button.text}
                        <span className='w-4 h-4 rtl:rotate-180'>
                            <Arrowtwo />
                        </span>
                    </Link>

                </div>

            </div>
            <div className='bg-Gray05 py-[60px] px-4'>
                <div className='max-w-[1392px] mx-auto'>
                    <div className='flex justify-between items-center'>
                        <h2 className=' text-primary md:text-[42px] font-semibold md:leading-[55px] text-[28px]'>{data.blogs.title}</h2>
                        <Link className='md:flex hidden gap-3 items-center text-base font-medium transition-all duration-500 text-Gold hover:text-primary' href={`${locale === "en" ? "" : "/ar"}${data.blogs.button.link}`}>
                            {data.blogs.button.text}
                             <span className='w-4 h-4 rtl:rotate-180'>
                                <Arrowtwo />
                            </span>
                        </Link>
                    </div>
                    <div className='flex gap-4 mt-10 l:overflow-hidden overflow-x-scroll noScrollBar l:px-0 px-4 l:mx-0 -mx-4'>
                        {Blogs.map((item, index) => (
                            <div key={index} className='w-[calc(100%/3-11px)] homepageBlogs'>
                                <BlogWidget data={item} />
                            </div>
                        ))}
                    </div>
                    <Link className='md:hidden flex justify-center mt-10 gap-3 items-center text-base font-medium transition-all duration-500 text-Gold hover:text-primary' href={`${locale === "en" ? "" : "/ar"}${data.blogs.button.link}`}>
                        {data.blogs.button.text}
                        <span className='w-4 h-4 rtl:rotate-180'>
                            <Arrowtwo />
                        </span>
                    </Link>
                </div>
            </div>
            <NeedHelp data={NeedHelpComp} />

        </div>
    )
}
