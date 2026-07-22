import Link from 'next/link'
import React from 'react'
import ButtonArrow from '../SVGs/ButtonArrow'
import Image from 'next/image'
import { useLocale } from 'next-intl'

export interface NeedHelpProps {
    tagline: string,
    title: string,
    content: string,
    button: {
        text: string,
        link: string
    }
}
export default function NeedHelp({ data }: { data: NeedHelpProps }) {
    const locale = useLocale();
    return (
        <div className='bg-Gray90 py-20 px-4'>
            <div className='max-w-[1392px] mx-auto flex justify-between items-center lg:p-[60px] sm:py-[60px] py-8 sm:px-8 px-4 bg-black rounded-[40px] md2:flex-row flex-col-reverse gap-y-8'>
                <div className='lg:w-[calc(100%-522px)] md2:w-[calc(100%-450px)] w-full space-y-8'>
                    <div className='space-y-2'>
                        <h2 className='text-lg text-white font-medium'>{data.tagline}</h2>
                        <h3 className='text-[42px] text-Gold font-extralight'>{data.title}</h3>
                        <p className='text-base text-Gray30'>{data.content}</p>
                    </div>

                    <Link className='bg-Gold9 text-white hover:bg-Gold transition-all duration-500 flex items-center text-base font-medium py-3 justify-center gap-3 lg:w-[338px] w-full rounded-full'
                        href={`${locale === "en" ? "" : "/ar"}${data.button.link}`}>
                        <span className='w-6 h-6'>
                            <ButtonArrow />
                        </span>
                        {data.button.text}
                    </Link>
                </div>
                <div className='lg:w-[409px] sm:w-[380px] w-[180px] aspect-square relative'>
                    <Image
                        src={'/Vector.webp'}
                        alt='need help'
                        fill
                    />

                </div>
            </div>

        </div>
    )
}
