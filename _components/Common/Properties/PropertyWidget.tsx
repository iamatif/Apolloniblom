"use client";
import LongArrow from '@/_components/SVGs/LongArrow'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function PropertyWidget({ data }: { data: any }) {
    const locale = useLocale();
    
    // Price logic
    const cleanNumericString = String(data.price).replace(/[^0-9]/g, '');
    const numericPrice = Number(cleanNumericString);
    const isPriceZero = !data.price || numericPrice === 0;

    return (
        <Link href={`${locale === "en" ? "" : "/ar"}/properties/${data.slug}`} className='space-y-4 group block w-full'>
            {/* Image Section */}
            <div className='relative w-full h-[280px] rounded-[18px] overflow-hidden bg-gray-100'>
                <Image
                    src={data.image?.src || "/placeholder.png"}
                    alt={data.image?.alt || data.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-all duration-700 ease-in-out'
                />
            </div>

            {/* Amenities Section */}
            {data.amenities && data.amenities.length > 0 && (
                <div className='flex gap-x-4 items-center flex-wrap min-h-[40px]'>
                    {/* slice(0, 1) ka matlab hai ke sirf pehli item uthao */}
                    {data.amenities.slice(0, 4).map((item2: any, index2: number) => (
                        <div key={index2} className='flex text-secondary text-sm items-center gap-1.5 font-light'>
                            <div className="relative w-4 h-4">
                                <Image 
                                    src={item2.logo.src} 
                                    alt={item2.logo.alt} 
                                    fill 
                                    className="object-contain" 
                                />
                            </div>
                            <span className='whitespace-nowrap'>{item2.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Title Section: Fixed min-height taake prices align rahein */}
            <h3 className='text-primary text-[17px] font-semibold line-clamp-2 min-h-[52px] leading-tight group-hover:text-Gold transition-colors'>
                {data.title}
            </h3>

            {/* Price & Arrow Section */}
            <div className='flex justify-between items-center pt-3 border-t border-Gray05'>
                <span className='text-Gold text-[24px] lg:text-[28px] font-bold'>
                    {isPriceZero ? (
                        <span className='text-Gray20 text-xl font-medium italic'>
                            {locale === 'ar' ? 'السعر عند الطلب' : 'Price on request'}
                        </span>
                    ) : (
                        data.price
                    )}
                </span>

                {/* Arrow Fix: Hover par BG black aur Arrow white hoga */}
                <span className='flex justify-center items-center w-11 h-11 rounded-full bg-Gray05 text-primary group-hover:bg-[text-Gold] group-hover:text-white transition-all duration-500'>
                    <span className='w-5 h-5 rtl:-rotate-90 rtl:group-hover:-rotate-[135deg] ltr:rotate-0 ltr:group-hover:rotate-45 transition-all duration-500'>
                        <LongArrow />
                    </span>
                </span>
            </div>
        </Link>
    )
}