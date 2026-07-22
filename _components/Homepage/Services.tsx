import Link from 'next/link'
import React from 'react'
import Arrowtwo from '../SVGs/Arrowtwo'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'
export interface ServicesProps {
    tagline: string,
    title: string,
    content: string,
    button: {
        text: string,
        link: string
    },
    items: {
        image: {
            src: string,
            alt: string
        },
        title: string,
        subtitle: string
    }[]
}
export default function Services({ data }: { data: ServicesProps }) {
    const locale = useLocale();
    const isArabic = /[\u0600-\u06FF]/.test(data.title)
    const words = isArabic ? data.title.split(' ') : data.title.split('')
    return (
        <div className='max-w-[1424px] px-4 mx-auto space-y-6 py-[60px]'>
            <div className='flex justify-between items-end pb-6 border-b border-Gold' >
                <div className='lg:max-w-[660px] space-y-2 lg:text-start text-center'>
                    <h2 className='text-lg font-medium text-primary'>{data.tagline}</h2>
                    <h3 className='text-primary md:text-[42px] font-semibold md:leading-[55px] text-[28px]'>
                        {words.map((part, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                viewport={{ once: true, amount: 0.3 }}
                                className={isArabic ? 'inline-block mr-1' : ''}
                            >
                                {isArabic ? part : part}
                            </motion.span>
                        ))}
                    </h3>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 1.2 }}
                        viewport={{ once: true, amount: 0.3 }} className='md:text-xl text-sm text-secondary' dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 1.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='lg:block hidden'>
                    <Link className='lg:flex hidden gap-3 items-center text-base font-medium transition-all duration-500 text-Gold hover:text-primary' href={`${locale === "en" ? "/" : "/ar/"}${data.button.link}`}>
                        {data.button.text}
                        <span className='w-4 h-4 rtl:rotate-180'>
                            <Arrowtwo />
                        </span>
                    </Link>
                </motion.div>
            </div>
            <div className='space-y-6'>
                {data.items.map((item, index) => (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        viewport={{ once: true, amount: 0.3 }}
                        key={index} className='flex justify-between lg:items-center lg:flex-row flex-col gap-y-2'>
                        <div className='w-[130px] h-20 relative rounded-lg overflow-hidden'>
                            <Image
                                src={item.image.src}
                                alt={item.image.alt ?? "Image"}
                                fill
                            />
                        </div>
                        <div className='w-fit md:text-[32px] text-xl font-semibold'>
                            0{index + 1}
                        </div>
                        <div className='lg:w-[620px] space-y-2'>
                            <h4 className='md:text-[28px] md:leading-9 text-xl font-semibold text-primary'>{item.title}</h4>
                            <p className='md:text-base text-sm text-secondary'>{item.subtitle}</p>
                        </div>
                    </motion.div>
                ))}

            </div>
            <Link className='lg:hidden flex gap-3 items-center text-base font-medium transition-all duration-500 text-Gold hover:text-primary lg:justify-start justify-center' href={`${locale === "en" ? "" : "/ar"}${data.button.link}`}>
                {data.button.text}
                <span className='w-4 h-4 rtl:rotate-180'>
                    <Arrowtwo />
                </span>
            </Link>
        </div>
    )
}
