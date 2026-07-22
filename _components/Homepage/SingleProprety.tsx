'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import BreadCrumb from '../Common/BreadCrumb'
import GallerySlider from '../Common/Properties/Gallery'
import Area from '../SVGs/Area'
import Bathrooms from '../SVGs/Bathrooms'
import Bedrooms from '../SVGs/Bedrooms'
import Region from '../SVGs/Region'
import Surface from '../SVGs/Surface'
import Done from '../SVGs/Done'
import NeedHelp, { NeedHelpProps } from '../Common/NeedHelp'
import LeadForm from '../Common/form/LeadForm'


interface SingleAmenity {
    name: string;
    logo: { src: string; alt: string };
}

interface SinglePropretyProps {
    id: number,
    title: string,
    slug: string,
    gallery: {
        src: string,
        alt: string
    }[],
    code: string,
    specs: {
        bedrooms: number,
        bathrooms: number,
        surface: number,
        area: number
    },
    region: {
        id: string,
        name: string
    },
    location: string,
    category: {
        id: string,
        name: string
    },
    price: string,
    amenities: SingleAmenity[],
    description: string,
    utilities: {
        title: string
    }[],
    features: {
        title: string,
        subtitle: string
    }[]
}

export default function SingleProprety({ data, NeedHelpComp }: { data: SinglePropretyProps, NeedHelpComp: NeedHelpProps }) {
    
    const t = useTranslations();
    const BreadCrumbList = [
        {
            title: t("data.properties"),
            link: "/properties"
        },
        {
            title: data.title
        }
    ]
    return (
        <>
            <div className='bg-Gray05 py-[60px] px-4'>
                <div className='max-w-[1392px] mx-auto flex items-start justify-between lg:flex-row flex-col'>
                    <div className='lg:w-[65%] w-full space-y-8'>
                        <div className='space-y-6'>
                            <BreadCrumb list={BreadCrumbList} />
                            <div className='relative rounded-3xl overflow-hidden'>
                                <GallerySlider
                                    Images={data.gallery}
                                />
                            </div>
                            <div className='space-y-2'>
                                <h2 className='bg-Gold2 p-1.5 text-secondary font-light w-fit flex gap-1'> {t("singleProperty.property_code")}<span className='font-semibold inline-block text-primary'>{data.code}</span></h2>
                                <h1 className='text-primary text-[42px] font-semibold max-w-[80%]'>{data.title}</h1>
                                <p className='text-Gold text-[32px] font-bold leading-[45px] py-2'>{data.price}</p>
                                <div className='flex gap-x-8 datas-center flex-wrap'>
                                    {data.region &&
                                        <div className='flex text-secondary text-base items-center gap-1 font-light'>
                                            <span className='w-[18px] h-[18px]'>
                                                <Region />
                                            </span>
                                            <span className='w-[calc(100%-22px)] whitespace-nowrap'>
                                                {data.region.name}
                                            </span>
                                        </div>
                                    }

                                    {data.specs.bedrooms &&
                                        <div className='flex text-secondary text-base items-center gap-1 font-light'>
                                            <span className='w-[18px] h-[18px]'>
                                                <Bedrooms />
                                            </span>
                                            <span className='w-[calc(100%-22px)] whitespace-nowrap'>
                                                {data.specs.bedrooms} {t("singleProperty.bedrooms")}
                                            </span>
                                        </div>
                                    }

                                    {data.specs.bathrooms &&
                                        <div className='flex text-secondary text-base items-center gap-1 font-light'>
                                            <span className='w-[18px] h-[18px]'>
                                                <Bathrooms />
                                            </span>
                                            <span className='w-[calc(100%-22px)] whitespace-nowrap'>
                                                {data.specs.bathrooms} {t("singleProperty.bathroom")}
                                            </span>
                                        </div>
                                    }

                                    {data.specs.surface &&
                                        <div className='flex text-secondary text-base items-center gap-1 font-light'>
                                            <span className='w-[18px] h-[18px]'>
                                                <Surface />
                                            </span>
                                            <span className='w-[calc(100%-22px)] whitespace-nowrap'>
                                                {data.specs.surface} {t("singleProperty.Sqm_Surface")}
                                            </span>
                                        </div>
                                    }
                                    {data.specs.area &&
                                        <div className='flex text-secondary text-base items-center gap-1 font-light'>
                                            <span className='w-[18px] h-[18px]'>
                                                <Area />
                                            </span>
                                            <span className='w-[calc(100%-22px)] whitespace-nowrap'>
                                                {data.specs.area} {t("singleProperty.Sqm_Residential_area")}
                                            </span>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='flex gap-x-8 datas-center flex-wrap'>
                                {data.amenities.map((item2, index2) => (
                                    <div key={index2} className='flex text-secondary text-base items-center gap-1 font-light'>
                                        <Image
                                            src={item2.logo.src}
                                            alt={item2.logo.alt}
                                            width={18}
                                            height={18}
                                        />
                                        <span className='w-[calc(100%-22px)] whitespace-nowrap'>
                                            {item2.name}
                                        </span>
                                    </div>
                                ))}

                            </div>
                            
                        </div>
                        <div className='md:p-8 p-4 bg-white border border-Gray10 rounded-3xl space-y-4'>
                            <h3 className='text-primary text-[28px] leading-9 font-semibold'>{t("singleProperty.property_details")}</h3>
                            <div className='space-y-3 text-secondary text-base font-light' dangerouslySetInnerHTML={{ __html: data.description }} />
                        </div>
                        <div className='md:p-8 p-4 bg-white border border-Gray10 rounded-3xl space-y-4'>
                            <h3 className='text-primary text-[28px] leading-9 font-semibold'>{t("singleProperty.features")}</h3>
                            <div className='space-y-4'>
                                <div className='space-y-1'>
                                    <h4 className='flex items-center text-primary text-base font-bold gap-1'>
                                        <span className='w-[18px] h-[18px]'>
                                            <Done />
                                        </span>
                                        {t("singleProperty.location")}
                                    </h4>
                                    <p className='text -base text-secondary font-light'>{data.location}</p>
                                </div>
                                {data.features.map((item, index) => (
                                    <div key={index} className='space-y-1'>
                                        <h4 className='flex items-center text-primary text-base font-bold gap-1'>
                                            <span className='w-[18px] h-[18px]'>
                                                <Done />
                                            </span>
                                            {item.title}
                                        </h4>
                                        <p className='text -base text-secondary font-light'>{item.subtitle}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='md:p-8 p-4 bg-white border border-Gray10 rounded-3xl space-y-4'>
                            <h3 className='text-primary text-[28px] leading-9 font-semibold'>{t("singleProperty.utilities")}</h3>
                            <div className='text-secondary text-base font-light leading-relaxed flex flex-col gap-1'>
                                {data.utilities
                                    .map(u => u.title)
                                    .join(';')
                                    .split(';')
                                    .map(s => s.trim())
                                    .filter(s => s.length > 0)
                                    .map((text, index) => {
                                        const parts = text.split(':');
                                        if (parts.length > 1) {
                                            const title = parts.shift();
                                            const rest = parts.join(':');
                                            return (
                                                <div key={index}>
                                                    <span className='font-semibold'>{title}:</span>{rest}
                                                </div>
                                            );
                                        }
                                        return (
                                            <div key={index}>
                                                {text}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-[calc(34%-20px)] w-full bg-Gray90 rounded-[32px] py-8 px-6 space-y-4 lg:sticky top-[47px] mt-[47px]'>
                        <div className='space-y-3'>
                            <h3 className='text-white text-[28px] leading-9 font-semibold'>{t("singleProperty.form:title")}</h3>
                            <p className='text-Gray20 text-base font-light'>{t("singleProperty.form_paragraph")}</p>
                        </div>
                        <LeadForm PropertyID={data.id} />
                    </div>
                </div>

            </div>
            <NeedHelp data={NeedHelpComp} />
        </>

    )
}
