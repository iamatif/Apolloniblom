import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import Arrowtwo from '../SVGs/Arrowtwo'
import { motion } from 'framer-motion'

export interface RegionsProps {
    title: string,
    subtitle: string,
}
export interface RegionsWidget {
    name: string,
    id: number,
    image: {
        src: string,
        alt: string
    },
    properties_count: number
}

export default function Regions({ data, AllRegions }: { data: RegionsProps, AllRegions: RegionsWidget[] }) {
    const t = useTranslations();
    const locale = useLocale();
    const isArabic = /[\u0600-\u06FF]/.test(data.title)
    const words = isArabic ? data.title.split(' ') : data.title.split('')

    return (
        <div className='bg-Gray90 py-[60px] px-4'>
            <div className='max-w-[1392px] mx-auto space-y-10'>
                <div className='space-y-2 md2:text-start text-center'>
                    <h3 className='text-white md:text-[42px] font-semibold md:leading-[55px] text-[28px]'>
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
                        viewport={{ once: true, amount: 0.3 }} className='md:text-xl text-sm text-Gray20' dangerouslySetInnerHTML={{ __html: data.subtitle }} />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 1.4 }}
                    viewport={{ once: true, amount: 0.3 }} className='flex flex-wrap gap-4'>
                    
                    {AllRegions.map((item, index) => {
                        // URL slug banana: "2-umbria" format mein
                        const regionSlug = `${item.id}-${item.name.toLowerCase().replace(/\s+/g, '-')}`;

                        return (
                            <Link 
                                href={`${locale === "en" ? "" : "/ar"}/regions/${regionSlug}`} 
                                key={index}
                                className={`${(index === 0 || AllRegions.length - 1 === index) ? "md:w-[calc(50%-8px)] w-full" : "md:w-[calc(50%/2-12px)] w-[calc(50%-8px)]"} relative md:h-[480px] h-[276px] rounded-[18px] overflow-hidden p-2.5 flex items-end group`}
                            >
                                <Image
                                    src={item.image.src}
                                    alt={item.image.alt ?? "Image"}
                                    fill
                                    className='group-hover:scale-105 transition-all duration-500 object-cover'
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className={`${(index === 0 || AllRegions.length - 1 === index) ? "md:w-[316px] w-[180px]" : "w-full"} relative bg-white rounded-lg p-2`}>
                                    <h3 className='md:text-xl text-xs font-semibold text-primary flex gap-1 items-center '>
                                        {item.name} 
                                        <span className='bg-Gold text-white text-xs font-medium p-0.5 w-5 rounded-[4px] rounded-es-none text-center'>
                                            {item.properties_count}
                                        </span>
                                    </h3>
                                    <div className='text-Gold flex gap-3 md:text-base text-[11px] font-medium items-center'>
                                        {t("buttons.discover_more")}
                                        <span className='w-4 h-4 rtl:rotate-180 '>
                                            <Arrowtwo />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    )
}