import Link from 'next/link'
import React from 'react'
import ButtonArrow from '../SVGs/ButtonArrow'
import LightCircle from '../SVGs/LightCircle'
import { useLocale } from 'next-intl'

interface Props {
    link: string,
    Title: string
}
export default function Button({ link, Title }: Props) {
    const locale = useLocale();
    return (
        <Link href={`${locale === "en" ? "" : "/ar"}${link}`} className='flex relative bg-black text-white hover:text-black hover:bg-white transition-all duration-500 border overflow-hidden gap-3 md:w-[306px] w-full justify-center text-base font-medium rounded-full py-3'>
            <span className='w-[52px] h-[52px] absolute start-0 overflow-hidden rounded-full'>
                <LightCircle />
            </span>
            <span className='w-6 h-6 '>
                <ButtonArrow />
            </span>
            {Title}

        </Link>
    )
}
