import Link from 'next/link'
import React from 'react'
import Home from '../SVGs/Home'
import { useLocale } from 'next-intl'
import Arrow from '../SVGs/Arrow'

interface Props {
    title: string,
    link?: string
}
export default function BreadCrumb({ list, light }: { list: Props[], light?: boolean }) {
    const locale = useLocale();
    return (
        <div className='flex items-center gap-2'>
            <Link href={`${locale === "en" ? "/" : "/ar"}`} className={`${light ? "text-white" : "text-black"} w-6 h-6`}>
                <Home />
            </Link>
            <span className={`w-4 h-4 rtl:rotate-180 ${light ? "text-white" : "text-black"}`}>
                <Arrow />
            </span>
            {list.map((item: Props, index: number) => (
                item.link ?
                    <>
                        <Link key={index} href={`${locale === "en" ? "" : "/ar"}${item.link?.startsWith('/') ? item.link : `/${item.link}`}`} className='text-primary text-sm font-semibold'>
                            {item.title}
                        </Link>
                        <span className={`w-4 h-4 rtl:rotate-180 ${light ? "text-white" : "text-black"}`}>
                            <Arrow />
                        </span>
                    </>

                    :
                    <p key={index} className='text-Gold text-sm font-bold line-clamp-1'>
                        {item.title}
                    </p>
            ))}

        </div>
    )
}
