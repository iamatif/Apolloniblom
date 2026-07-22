import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Arrowtwo from '../SVGs/Arrowtwo'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'

export interface AboutProps {
    tagline: string,
    title: string,
    content: string,
    button: {
        text: string,
        link: string
    },
    image: {
        src: string,
        alt: string
    }
}

export default function About({ data }: { data: AboutProps }) {
    const locale = useLocale();
    return (
        <div className='max-w-[1424px] px-4 mx-auto flex items-center justify-between py-[60px] md2:flex-row flex-col-reverse gap-y-8 overflow-hidden'>
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className='md2:w-[480px] w-full md2:text-start text-center space-y-2'>
                <h2 className='sm:text-lg text-base font-medium text-primary'>{data.tagline}</h2>
                <h3 className='text-primary md:text-[42px] font-semibold md:leading-[55px] text-[28px]'>{data.title}</h3>
                <div className='sm:text-xl text-sm text-secondary' dangerouslySetInnerHTML={{ __html: data.content }} />
                <Link className='flex gap-3 items-center text-base font-medium transition-all duration-500 text-Gold hover:text-primary md2:justify-start justify-center' href={`${locale === "en" ? "" : "/ar"}${data.button.link}`}>
                    {data.button.text}
                    <span className='w-4 h-4 rtl:rotate-180'>
                        <Arrowtwo />
                    </span>
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }} className='xl:w-[563px] sm:w-[500px] w-full md2:m-0 mx-auto relative aspect-square'>
                <Image
                    src={data.image.src}
                    alt={data.image.alt}
                    fill
                />
            </motion.div>
        </div >
    )
}
