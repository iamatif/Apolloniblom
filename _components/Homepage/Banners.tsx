import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LongArrow from '../SVGs/LongArrow'
import { motion } from 'framer-motion'

export interface BannersProps {
    image: {
        src: string,
        alt: string
    },
    title: string,
    link: string
}
export default function Banners({ data }: { data: BannersProps[] }) {
    const locale = useLocale();
    return (
        <div className='max-w-[1424px] px-4 mx-auto flex gap-4 justify-between py-[60px] md2:flex-row flex-col overflow-hidden'>
            {data.map((item, index) => (
                <motion.div
                    initial={{ opacity: 0, x: index === 0 ? -10 : 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                    key={index} className='md2:w-[calc(100%/2)] w-full md2:h-[480px] h-[276px]'>
                    <Link className='group w-full h-full  rounded-[18px] relative overflow-hidden flex items-end' href={`${locale === "en" ? "" : "/ar"}${item.link}`}>
                        <span className='absolute inset-0 z-10' style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 54.9%, rgba(0, 0, 0, 0.7) 100%)" }} />
                        <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            fill
                            className='object-cover transition-all duration-500 group-hover:scale-110'
                        />
                        <div className='flex relative z-10 justify-between items-center p-4 w-full'>
                            <h2 className='text-white md2:text-xl text-base'>{item.title}</h2>
                            <div className='flex justify-center items-center md:w-[62px] md:h-[50px] w-[46px] h-[38px] rounded-[30px] bg-Gray05'>
                                <span className='w-[26px] h-[26px] rtl:-rotate-90 rtl:group-hover:-rotate-[135deg] ltr:group-hover:rotate-45  transition-all duration-500'>
                                    <LongArrow />
                                </span>
                            </div>
                        </div>

                    </Link>
                </motion.div>

            ))}
        </div>
    )
}
