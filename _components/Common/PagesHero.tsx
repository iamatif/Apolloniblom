'use client'
import React from 'react'
import Button from './Button'
import BreadCrumb from './BreadCrumb'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
export interface PropsHero {
    image: {
        src: string,
        alt: string
    },
    title: string,
    subtitle: string,
    button: {
        text: string,
        link: string
    }
}

export default function PagesHero({ data, slug }: { data: PropsHero, slug: string }) {
    const t = useTranslations();
    const BreadCrumbList = [
        {
            title: t(`data.${slug}`)
        }
    ]

    return (
        <div className='first-section relative h-screen content-end overflow-hidden'>
            <span className=' absolute inset-0 w-full h-full z-10' style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 22.89%)" }} />
            <Image
                src={data.image.src}
                alt={data.image.alt ?? "Image"}
                fill
                className=' object-cover'
            />
            <div className='max-w-[1512px] mx-auto lg:px-[60px] px-4 relative z-20'>
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='bg-white space-y-6 ltr:rounded-tl-[60px] rtl:rounded-tr-[60px] py-10 md:ps-[60px] ps-6 max-w-[868px] ms-auto '>
                    <div className=' space-y-1.5'>
                        <BreadCrumb list={BreadCrumbList} />
                        <h1 className='lg:text-[55px] md:text-[45px] md:leading-[55px] text-4xl font-semibold text-primary lg:leading-[70px]'>{data.title}</h1>
                    </div>
                    <div className='text-secondary md:text-xl text-base' dangerouslySetInnerHTML={{ __html: data.subtitle }} />
                    <Button link={data.button.link} Title={data.button.text} />
                </motion.div>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, }}
                    viewport={{ once: true, amount: 0.3 }}
                    className=' absolute inset-y-0 start-auto md:-end-[calc(100%-60px)] -end-[calc(100%-16px)] w-full h-full z-10 bg-white' />

            </div>

        </div>
    )
}
